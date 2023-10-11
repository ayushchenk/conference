using ConferenceManager.Api.Filters;
using ConferenceManager.Api.Middleware;
using ConferenceManager.Api.Services;
using ConferenceManager.Api.Util;
using ConferenceManager.Core;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure;
using ConferenceManager.Infrastructure.Persistence;
using ConferenceManager.Infrastructure.Util;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;
using System.Text;

namespace ConferenceManager.Api
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            var tokenSettings = configuration.GetSection("TokenSettings").Get<TokenSettings>()!;
            var corsSettings = configuration.GetSection("CorsSettings").Get<CorsSettings>()!;

            services.AddCors(o => o.AddPolicy(CorsPolicies.Front, builder =>
            {
                builder.WithOrigins(corsSettings.FrontUrl)
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .WithExposedHeaders(Headers.FileName);
            }));

            services.AddLogging(loggin =>
            {
                loggin.AddSimpleConsole(options =>
                {
                    options.UseUtcTimestamp = true;
                    options.TimestampFormat = "[yyyy-MM-ddTHH:mm:ss.fffZ] ";
                });
            });

            services.AddHttpContextAccessor();

            services.AddScoped<SignInManager<ApplicationUser>>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IIdentityService, IdentityService>();

            services.AddTransient<ExceptionMiddleware>();
            services.AddTransient<LoggingMiddleware>();

            services.AddAuthorization();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidIssuer = tokenSettings.Issuer,
                        ValidAudience = tokenSettings.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.Key)),
                        ClockSkew = TimeSpan.Zero,
                    };
                });

            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Put the token value here (without 'Bearer ')",
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme()
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });

                //var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                //options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

                options.OperationFilter<SwaggerRolesFilter>();
                options.OperationFilter<SwaggerConferenceHeaderFilter>();
            });

            services.Configure<SecurityStampValidatorOptions>(options =>
            {
                // enables immediate logout, after updating the user's stat.
                options.ValidationInterval = TimeSpan.Zero;
            });

            var mappers = typeof(IMapper<,>).Assembly.GetTypes()
                .Where(type => type.GetInterface("IMapper`2") != null)
                .Select(type =>
                {
                    var service = type.GetInterface("IMapper`2")!;
                    var source = service.GenericTypeArguments.First();
                    var destination = service.GenericTypeArguments.Last();
                    return new MapperDescription()
                    {
                        Service = service,
                        Implementation = type,
                        Source = source,
                        Destination = destination
                    };
                }).ToList();

            foreach (var mapper in mappers)
            {
                services.Add(new ServiceDescriptor(mapper.Service, mapper.Implementation, ServiceLifetime.Scoped));
            }

            services.AddSingleton<List<MapperDescription>>(mappers);
            services.AddSingleton<IMappingHost, MappingHost>();

            return services;
        }

        public static async Task PrepareAndRunApp(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.Configure<TokenSettings>(builder.Configuration.GetSection("TokenSettings"));
            builder.Services.Configure<SeedSettings>(builder.Configuration.GetSection("SeedSettings"));

            builder.Services.AddInfrastructureServices(builder.Configuration);
            builder.Services.AddCoreServices(builder.Configuration);
            builder.Services.AddApiServices(builder.Configuration);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            using (var scope = app.Services.CreateScope())
            {
                var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();
                await initialiser.InitialiseAsync();
                await initialiser.SeedAsync();
            }

            app.UseHttpsRedirection();

            app.UseMiddleware<ExceptionMiddleware>();
            app.UseMiddleware<LoggingMiddleware>();

            app.UseAuthentication();

            app.UseCors(CorsPolicies.Front);

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}