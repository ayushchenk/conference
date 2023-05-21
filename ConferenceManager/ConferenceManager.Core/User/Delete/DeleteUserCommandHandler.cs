using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.User.Delete
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, DeleteEntityResponse>
    {
        private readonly IIdentityService _identityService;

        public DeleteUserCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<DeleteEntityResponse> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            await _identityService.DeleteUser(request.Id);

            return DeleteEntityResponse.Success;
        }
    }
}
