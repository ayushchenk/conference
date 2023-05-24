using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;

namespace ConferenceManager.Core.Conferences.RemoveParticipant
{
    public class RemoveParticipantCommandHandler : DbContextRequestHandler<RemoveParticipantCommand, EmptyResponse>
    {
        public RemoveParticipantCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EmptyResponse> Handle(RemoveParticipantCommand request, CancellationToken cancellationToken)
        {
            var participation = Context.ConferenceParticipants
                .FirstOrDefault(p => p.ConferenceId == request.ConferenceId && p.UserId == request.UserId);

            if (participation == null)
            {
                throw new NotFoundException();
            }

            Context.ConferenceParticipants.Remove(participation);

            await Context.SaveChangesAsync(cancellationToken);

            return EmptyResponse.Value;
        }
    }
}
