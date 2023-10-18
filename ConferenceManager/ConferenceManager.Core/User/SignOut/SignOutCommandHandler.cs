using ConferenceManager.Core.Common.Interfaces;
using MediatR;

namespace ConferenceManager.Core.User.SignOut
{
    public class SignOutCommandHandler : IRequestHandler<SignOutCommand>
    {
        private readonly IIdentityService _identityService;

        public SignOutCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public Task Handle(SignOutCommand request, CancellationToken cancellationToken)
        {
            _identityService.SignOut();
            
            return Task.CompletedTask;
        }
    }
}
