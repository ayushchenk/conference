using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Infrastructure.Util;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.User.AssignRole
{
    public class AssignRoleCommandHandler : DbContextRequestHandler<AssignRoleCommand>
    {
        private readonly SeedSettings _settings;

        public AssignRoleCommandHandler(
            IOptions<SeedSettings> settings,
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
            _settings = settings.Value;
        }

        public override async Task Handle(AssignRoleCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
