using ConferenceManager.Api.Shared.Util;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConferenceManager.Api.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _manager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TokenSettings _settings;
        private readonly IDateTimeService _dateTime;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<TokenSettings> settings,
            IDateTimeService dateTime,
            IHttpContextAccessor httpContextAccessor)
        {
            _manager = userManager;
            _signInManager = signInManager;
            _settings = settings.Value;
            _dateTime = dateTime;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<AuthResponse> Authenticate(TokenRequest request)
        {
            var user = await _manager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new IdentityException("Incorrect email or password");
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!signInResult.Succeeded)
            {
                throw new IdentityException("Incorrect email or password");
            }

            return GenerateToken(user);
        }

        public void SignOut()
        {
            _httpContextAccessor.HttpContext?.Response.Cookies.Append(Cookies.Token, string.Empty, new CookieOptions()
            {
                Expires = _dateTime.Now.AddDays(-1),
                IsEssential = true,
            });
        }

        public async Task CreateUser(ApplicationUser user, string password)
        {
            var createResult = await _manager.CreateAsync(user, password);

            if (!createResult.Succeeded)
            {
                throw new IdentityException(createResult.Errors);
            }
        }

        public async Task DeleteUser(int id)
        {
            var user = await _manager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            await _manager.DeleteAsync(user);
        }

        public AuthResponse GenerateToken(ApplicationUser user)
        {
            byte[] key = Encoding.ASCII.GetBytes(_settings.Key);

            var handler = new JwtSecurityTokenHandler();

            var descriptor = new SecurityTokenDescriptor
            {
                Issuer = _settings.Issuer,
                Audience = _settings.Audience,
                Expires = _dateTime.Now.AddMinutes(_settings.ExpiresMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Email!),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                })
            };

            var roles = user.ConferenceRoles
                ?.Select(r => new { r.ConferenceId, Role = r.Role.Name! })
                ?.GroupBy(r => r.ConferenceId)
                ?.ToDictionary(key => key.Key, value => value.Select(v => v.Role).ToArray())
                ?? new Dictionary<int, string[]>();

            var participations = user.ConferenceParticipations
                ?.Select(part => part.Id)
                ?.ToArray() ?? Array.Empty<int>();

            var uniqueRoles = roles.SelectMany(r => r.Value).Distinct();

            foreach (var role in uniqueRoles)
            {
                descriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            if (user.IsAdmin)
            {
                descriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, ApplicationRole.Admin));
            }

            descriptor.Subject.AddClaim(new Claim(Claims.ConferenceRoles, JsonConvert.SerializeObject(roles)));
            descriptor.Subject.AddClaim(new Claim(Claims.ConferenceParticipations, JsonConvert.SerializeObject(participations)));

            var token = handler.CreateToken(descriptor);
            var tokenValue = handler.WriteToken(token);

            _httpContextAccessor.HttpContext?.Response.Cookies.Append(Cookies.Token, tokenValue, new CookieOptions()
            {
                MaxAge = TimeSpan.FromMinutes(_settings.ExpiresMinutes),
                IsEssential = true,
            });

            return new AuthResponse()
            {
                Id = user.Id,
                Roles = roles,
                Admin = user.IsAdmin,
                ValidTo = token.ValidTo,
            };
        }
    }
}
