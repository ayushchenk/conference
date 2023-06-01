using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.GetReviews
{
    public class GetSubmissionReviewsQueryHandler : DbContextRequestHandler<GetSubmissionReviewsQuery, IEnumerable<ReviewDto>>
    {
        public GetSubmissionReviewsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<ReviewDto>> Handle(GetSubmissionReviewsQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            return submission!.Reviews
                .OrderByDescending(s => s.CreatedOn)
                .Select(Mapper.Map<Review, ReviewDto>);
        }
    }
}
