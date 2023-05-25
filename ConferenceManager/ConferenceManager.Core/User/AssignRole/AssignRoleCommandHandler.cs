using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.User.AddRole;
using MediatR;

namespace ConferenceManager.Core.User.AssignRole
{
    public class AssignRoleCommandHandler : IRequestHandler<AssignRoleCommand>
    {
        private readonly IIdentityService _service;

        public AssignRoleCommandHandler(IIdentityService service)
        {
            _service = service;
        }

        public async Task Handle(AssignRoleCommand request, CancellationToken cancellationToken)
        {
            await _service.AssignRole(request.Id, request.Role);
        }
    }
}
