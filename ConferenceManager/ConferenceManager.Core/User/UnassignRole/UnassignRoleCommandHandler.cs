using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.User.AssignRole
{
    public class UnassignRoleCommandHandler : IRequestHandler<UnassignRoleCommand, UpdateEntityResponse>
    {
        private readonly UserManager<ApplicationUser> _manager;

        public UnassignRoleCommandHandler(UserManager<ApplicationUser> manager)
        {
            _manager = manager;
        }

        public async Task<UpdateEntityResponse> Handle(UnassignRoleCommand request, CancellationToken cancellationToken)
        {
            var user = await _manager.FindByIdAsync(request.Id.ToString());

            if (user == null)
            {
                throw new NotFoundException();
            }

            await _manager.RemoveFromRoleAsync(user, request.Role);

            return UpdateEntityResponse.Success;
        }
    }
}
