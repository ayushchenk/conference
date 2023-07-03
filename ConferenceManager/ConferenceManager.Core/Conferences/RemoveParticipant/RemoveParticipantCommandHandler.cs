using ConferenceManager.Core.Common;
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
                return;
            }

            using var transaction = Context.Database.BeginTransaction();

            Context.ConferenceParticipants.Remove(participation);

            var conferenceRoles = Context.UserRoles
                .Where(r => r.UserId == request.UserId && r.ConferenceId == request.ConferenceId);

            if (conferenceRoles.Any())
            {
                Context.UserRoles.RemoveRange(conferenceRoles);
            }

            var reviewAssignments = Context.SubmissionReviewers
                .Where(r => r.ReviewerId == request.UserId && r.Submission.ConferenceId == request.ConferenceId);

            if (reviewAssignments.Any())
            {
                Context.SubmissionReviewers.RemoveRange(reviewAssignments);
            }

            await Context.SaveChangesAsync(cancellationToken);

            transaction.Commit();
        }
    }
}
