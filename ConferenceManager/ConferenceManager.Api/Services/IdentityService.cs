﻿using Azure.Core;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
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

        public IdentityService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<TokenSettings> settings,
            IDateTimeService dateTime
            )
        {
            _manager = userManager;
            _signInManager = signInManager;
            _settings = settings.Value;
            _dateTime = dateTime;
        }

        public async Task<TokenResponse> Authenticate(TokenRequest request)
        {
            var user = await _manager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (!signInResult.Succeeded)
            {
                throw new IdentityException("Incorrect password");
            }

            var roles = await _manager.GetRolesAsync(user);

            return GenerateJwtToken(user, roles);
        }

        public async Task<TokenResponse> CreateUser(ApplicationUser user, string password)
        {
            var createResult = await _manager.CreateAsync(user, password);

            if (!createResult.Succeeded)
            {
                throw new IdentityException(createResult.Errors);
            }

            await _manager.AddToRoleAsync(user, ApplicationRole.Author);

            return await Authenticate(new TokenRequest()
            {
                Email = user.Email!,
                Password = password
            });
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

        public async Task AssignRole(int id, string role)
        {
            var user = await _manager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            await _manager.AddToRoleAsync(user, role);
            await _manager.UpdateSecurityStampAsync(user);
        }

        public async Task UnassignRole(int id, string role)
        {
            var user = await _manager.FindByIdAsync(id.ToString());

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            await _manager.RemoveFromRoleAsync(user, role);
            await _manager.UpdateSecurityStampAsync(user);
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

            foreach (var role in roles)
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
