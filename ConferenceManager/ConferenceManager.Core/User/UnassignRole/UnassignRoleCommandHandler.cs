using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.User.AddRole;
using MediatR;

namespace ConferenceManager.Core.User.AssignRole
{
    public class UnassignRoleCommandHandler : IRequestHandler<UnassignRoleCommand>
    {
        private readonly IIdentityService _service;

        public UnassignRoleCommandHandler(IIdentityService service)
        {
            _service = service;
        }

        public async Task Handle(UnassignRoleCommand request, CancellationToken cancellationToken)
        {
            await _service.UnassignRole(request.Id, request.Role);
        }
    }
}
