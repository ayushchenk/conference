using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.User.IsParticipant
{
    public class IsParticipantQueryHandler : DbContextRequestHandler<IsParticipantQuery, bool>
    {
        public IsParticipantQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<bool> Handle(IsParticipantQuery request, CancellationToken cancellationToken)
        {
            var participation = await Context.ConferenceParticipants
                .FindAsync(new object[] { request.UserId, request.ConferenceId }, cancellationToken);

            return participation != null;
        }
    }
}
