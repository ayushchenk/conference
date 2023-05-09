using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Core.Exceptions;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConferenceManager.Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly TokenSettings _settings;
        private readonly IDateTimeService _dateTime;
        private readonly ILogger<TokenService> _logger;

        public TokenService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<TokenSettings> settings,
            IDateTimeService dateTime,
            ILogger<TokenService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _settings = settings.Value;
            _dateTime = dateTime;
            _logger = logger;
        }

        public async Task<TokenResponse> Authenticate(TokenRequest request)
        {
            if (!await TrySignIn(request.Email, request.Password))
            {
                throw new TokenGenerationFailedException();
            }

            var user = await _userManager.FindByEmailAsync(request.Email);

            var roles = await _userManager.GetRolesAsync(user!);

            return GenerateJwtToken(user!, roles);
        }

        private async Task<bool> TrySignIn(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                _logger.LogInformation($"User {email} not found");
                return false;
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            if (!signInResult.Succeeded)
            {
                _logger.LogInformation($"Unable to sign in user {email}");
            }

            return signInResult.Succeeded;
        }

        private TokenResponse GenerateJwtToken(ApplicationUser user, IEnumerable<string> roles)
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

            foreach(var role in roles)
            {
                descriptor.Subject.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var token = handler.CreateToken(descriptor);
            var tokenValue = handler.WriteToken(token);

            return new TokenResponse()
            {
                UserId = user.Id,
                Email = user.Email!,
                Roles = roles,
                Token = new Token()
                {
                    AccessToken = tokenValue,
                    Issued = _dateTime.Now,
                    Expiry = descriptor.Expires.Value
                }
            };
        }
    }
}
