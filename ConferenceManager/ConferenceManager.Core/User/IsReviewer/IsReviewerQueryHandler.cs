using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.User.IsReviewer
{
    public class IsReviewerQueryHandler : DbContextRequestHandler<IsReviewerQuery, bool>
    {
        public IsReviewerQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<bool> Handle(IsReviewerQuery request, CancellationToken cancellationToken)
        {
            var assignment = await Context.SubmissionReviewers
                .FindAsync(new object[] { request.SubmissionId, request.UserId }, cancellationToken);

            return assignment != null;
        }
    }
}
