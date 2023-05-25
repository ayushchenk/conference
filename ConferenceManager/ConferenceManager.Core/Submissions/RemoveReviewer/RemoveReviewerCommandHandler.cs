using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
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
            var reviewAssignment = Context.SubmissionReviewers
                .FirstOrDefault(sr => sr.ReviewerId == request.UserId && sr.SubmissionId == request.SubmissionId);

            if (reviewAssignment == null)
            {
                throw new NotFoundException();
            }

            Context.SubmissionReviewers.Remove(reviewAssignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
