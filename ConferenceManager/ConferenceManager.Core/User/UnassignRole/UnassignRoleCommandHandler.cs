using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.User.AssignRole
{
    public class UnassignRoleCommandHandler : DbContextRequestHandler<UnassignRoleCommand>
    {
        private readonly RoleManager<ApplicationRole> _roleManager;

        public UnassignRoleCommandHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper,
            RoleManager<ApplicationRole> roleManager) : base(context, currentUser, mapper)
        {
            _roleManager = roleManager;
        }

        public override async Task Handle(UnassignRoleCommand request, CancellationToken cancellationToken)
        {
            var role = await _roleManager.FindByNameAsync(request.Role);

            var assignment = await Context.UserRoles
                .FindAsync(new { UserId = request.Id, RoleId = role!.Id, request.ConferenceId }, cancellationToken);

            if (assignment == null)
            {
                return;
            }

            Context.UserRoles.Remove(assignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
