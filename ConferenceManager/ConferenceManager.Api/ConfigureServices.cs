using CleanArchitecture.WebUI.Services;
using ConferenceManager.Api.Services;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
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

            services.AddHttpContextAccessor();

            services.AddScoped<SignInManager<ApplicationUser>>();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ITokenService, TokenService>();

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

            return services;
        }
    }
}