using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.User.AssignAdminRole
{
    public class AssignAdminRoleCommandHandler : DbContextRequestHandler<AssignAdminRoleCommand>
    {
        public AssignAdminRoleCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(AssignAdminRoleCommand request, CancellationToken cancellationToken)
        {
            var user = await Context.Users.FindAsync(request.Id, cancellationToken);

            user!.IsAdmin = request.Operation == AssignOperation.Assign;

            Context.Users.Update(user);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
