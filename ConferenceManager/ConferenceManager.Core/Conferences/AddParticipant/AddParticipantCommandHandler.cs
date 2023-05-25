using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.AddParticipant
{
    public class AddParticipantCommandHandler : DbContextRequestHandler<AddParticipantCommand>
    {
        public AddParticipantCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(AddParticipantCommand request, CancellationToken cancellationToken)
        {
            var participation = await Context.ConferenceParticipants
                .FindAsync(new object[] { request.UserId, request.ConferenceId }, cancellationToken);

            if (participation != null)
            {
                return;
            }

            var conference = await Context.Conferences.FindAsync(request.ConferenceId, cancellationToken);
            var user = await Context.Users.FindAsync(request.UserId, cancellationToken);

            if (user == null || conference == null)
            {
                throw new NotFoundException("User of conference not found");
            }

            Context.ConferenceParticipants.Add(new ConferenceParticipant()
            {
                ConferenceId = request.ConferenceId,
                UserId = request.UserId,
            });

            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
