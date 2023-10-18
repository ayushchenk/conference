using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.User.Login
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, AuthResponse>
    {
        private readonly IIdentityService _identityService;

        public LoginUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<AuthResponse> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            return await _identityService.Authenticate(new TokenRequest()
            {
                Email = request.Email,
                Password = request.Password
            });
        }
    }
}
