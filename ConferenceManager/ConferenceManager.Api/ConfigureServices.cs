using CleanArchitecture.WebUI.Services;
using ConferenceManager.Api.Services;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ConferenceManager.Api
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration configuration)
        {
            var tokenSettings = configuration.Get<TokenSettings>();
            
            services.AddHttpContextAccessor();

            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = tokenSettings!.Issuer,
                    ValidAudience = tokenSettings!.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings!.Key)),
                    ClockSkew = TimeSpan.Zero,
                };
            });

            return services;
        }
    }
}