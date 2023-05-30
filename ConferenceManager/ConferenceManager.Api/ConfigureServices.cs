using ConferenceManager.Api.Filters;
using ConferenceManager.Api.Services;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
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

            services.AddCors(o => o.AddPolicy("local",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                      }));

            services.AddDatabaseDeveloperPageExceptionFilter();
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
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Bearer <access_token>",
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

                var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

                options.OperationFilter<SwaggerRolesFilter>();
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
                services.Add(new ServiceDescriptor(mapper.Service, mapper.Implementation, ServiceLifetime.Singleton));
            }

            services.AddSingleton<List<MapperDescription>>(mappers);
            services.AddSingleton<IMappingHost, MappingHost>();

            return services;
        }
    }
}