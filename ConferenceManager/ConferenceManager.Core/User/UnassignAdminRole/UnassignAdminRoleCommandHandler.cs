using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.User.UnassignAdminRole
{
    public class UnassignAdminRoleCommandHandler : DbContextRequestHandler<UnassignAdminRoleCommand>
    {
        private readonly SeedSettings _settings;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public UnassignAdminRoleCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            IOptions<SeedSettings> settings,
            RoleManager<ApplicationRole> roleManager) : base(context, currentUser, mapper)
        {
            _settings = settings.Value;
            _roleManager = roleManager;
        }

        public override async Task Handle(UnassignAdminRoleCommand request, CancellationToken cancellationToken)
        {
            var adminConference = await Context.Conferences
                .FirstOrDefaultAsync(c => c.Title == _settings.AdminConference, cancellationToken);

            var role = await _roleManager.FindByNameAsync(ApplicationRole.Admin);

            var assignment = await Context.UserRoles
                .FindAsync(new object[] { request.Id, role!.Id, adminConference!.Id }, cancellationToken);

            if (assignment == null)
            {
                return;
            }

            Context.UserRoles.Remove(assignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
