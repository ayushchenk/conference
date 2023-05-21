using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;
using MediatR;

namespace ConferenceManager.Core.Account.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, TokenResponse>
    {
        private readonly IMapper<RegisterUserCommand, ApplicationUser> _mapper;
        private readonly IIdentityService _identityService;

        public RegisterUserCommandHandler(
            IMapper<RegisterUserCommand, ApplicationUser> mapper,
            IIdentityService identityService
            )
        {
            _mapper = mapper;
            _identityService = identityService;
        }

        public async Task<TokenResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = _mapper.Map(request);

            return await _identityService.CreateUser(user, request.Password);
        }
    }
}
