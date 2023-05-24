using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.User.AssignRole
{
    public class AssignRoleCommandHandler : IRequestHandler<AssignRoleCommand, UpdateEntityResponse>
    {
        private readonly UserManager<ApplicationUser> _manager;

        public AssignRoleCommandHandler(UserManager<ApplicationUser> manager)
        {
            _manager = manager;
        }

        public async Task<UpdateEntityResponse> Handle(AssignRoleCommand request, CancellationToken cancellationToken)
        {
            var user = await _manager.FindByIdAsync(request.Id.ToString());

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            await _manager.AddToRoleAsync(user, request.Role);
            await _manager.UpdateSecurityStampAsync(user);

            return UpdateEntityResponse.Success;
        }
    }
}
