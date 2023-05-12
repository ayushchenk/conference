using AutoMapper;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.Account.Commands.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, TokenResponse>
    {
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUser> _userManager;

        public RegisterUserCommandHandler(
            IMapper mapper,
            ITokenService tokenService,
            UserManager<ApplicationUser> userManager
            )
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        public async Task<TokenResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map<ApplicationUser>(request);

            var createResult = await _userManager.CreateAsync(user, request.Password);

            if (!createResult.Succeeded)
            {
                throw new IdentityException(createResult.Errors);
            }

            await _userManager.AddToRoleAsync(user, ApplicationRole.Author);

            return await _tokenService.Authenticate(new TokenRequest()
            {
                Email = request.Email,
                Password = request.Password
            });
        }
    }
}
