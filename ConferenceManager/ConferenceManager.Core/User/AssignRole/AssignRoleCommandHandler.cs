using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.User.AssignRole
{
    public class AssignRoleCommandHandler : DbContextRequestHandler<AssignRoleCommand>
    {
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AssignRoleCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            RoleManager<ApplicationRole> roleManager) : base(context, currentUser, mapper)
        {
            _roleManager = roleManager;
        }

        public override async Task Handle(AssignRoleCommand request, CancellationToken cancellationToken)
        {
            var role = await _roleManager.FindByNameAsync(request.Role);

            var existingAssignment = await Context.UserRoles
                .FindAsync(new { UserId = request.Id, RoleId = role!.Id, request.ConferenceId }, cancellationToken);

            if (existingAssignment != null)
            {
                return;
            }

            var newAssignment = new UserConferenceRole()
            {
                UserId = request.Id,
                RoleId = role!.Id,
                ConferenceId = request.ConferenceId,
            };

            Context.UserRoles.Add(newAssignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
