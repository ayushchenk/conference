using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Submissions.RemoveReviewer
{
    public class RemoveReviewerCommandHandler : DbContextRequestHandler<RemoveReviewerCommand>
    {
        public RemoveReviewerCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(RemoveReviewerCommand request, CancellationToken cancellationToken)
        {
            var reviewAssignment = await Context.SubmissionReviewers
                .FindAsync(new object[] { request.SubmissionId, request.UserId }, cancellationToken);

            if (reviewAssignment == null)
            {
                return;
            }

            Context.SubmissionReviewers.Remove(reviewAssignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
