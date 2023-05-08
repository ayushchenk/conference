using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.Account.Commands.Login
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, TokenResponse>
    {
        private readonly ITokenService _tokenService;

        public LoginUserCommandHandler(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public async Task<TokenResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            return await _tokenService.Authenticate(new TokenRequest() 
            {
                Email = request.Email,
                Password = request.Password
            });
        }
    }
}
