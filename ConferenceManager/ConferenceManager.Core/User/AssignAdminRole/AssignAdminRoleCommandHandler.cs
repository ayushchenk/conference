using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.User.AssignAdminRole
{
    public class AssignAdminRoleCommandHandler : DbContextRequestHandler<AssignAdminRoleCommand>
    {
        private readonly SeedSettings _settings;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public AssignAdminRoleCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            IOptions<SeedSettings> settings,
            RoleManager<ApplicationRole> roleManager) : base(context, currentUser, mapper)
        {
            _settings = settings.Value;
            _roleManager = roleManager;
        }

        public override async Task Handle(AssignAdminRoleCommand request, CancellationToken cancellationToken)
        {
            var adminConference = await Context.Conferences
                .FirstOrDefaultAsync(c => c.Title == _settings.AdminConference, cancellationToken);

            var role = await _roleManager.FindByNameAsync(ApplicationRole.Admin);

            var existingAssignment = await Context.UserRoles
                .FindAsync(new { UserId = request.Id, RoleId = role!.Id, ConferenceId = adminConference!.Id }, cancellationToken);

            if (existingAssignment != null)
            {
                return;
            }

            var newAssignment = new UserConferenceRole()
            {
                UserId = request.Id,
                RoleId = role!.Id,
                ConferenceId = adminConference!.Id,
            };

            Context.UserRoles.Add(newAssignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
