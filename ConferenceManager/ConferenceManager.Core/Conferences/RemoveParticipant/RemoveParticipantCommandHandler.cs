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
            var participation = Context.ConferenceParticipants
                .FirstOrDefault(p => p.ConferenceId == request.ConferenceId && p.UserId == request.UserId);

            if (participation == null)
            {
                throw new NotFoundException();
            }

            Context.ConferenceParticipants.Remove(participation);

            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
