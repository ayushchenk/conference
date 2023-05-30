using ConferenceManager.Core.Common.Interfaces;
using MediatR;

namespace ConferenceManager.Core.User.Delete
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand>
    {
        private readonly IIdentityService _identityService;

        public DeleteUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            await _identityService.DeleteUser(request.Id);
        }
    }
}
