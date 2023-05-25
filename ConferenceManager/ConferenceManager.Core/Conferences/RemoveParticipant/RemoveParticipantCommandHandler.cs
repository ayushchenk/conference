using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Conferences.RemoveParticipant
{
    public class RemoveParticipantCommandHandler : DbContextRequestHandler<RemoveParticipantCommand>
    {
        public RemoveParticipantCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(RemoveParticipantCommand request, CancellationToken cancellationToken)
        {
            var participation = await Context.ConferenceParticipants
                .FindAsync(new object[] { request.UserId, request.ConferenceId }, cancellationToken);

            if (participation == null)
            {
                throw new NotFoundException();
            }

            Context.ConferenceParticipants.Remove(participation);

            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
