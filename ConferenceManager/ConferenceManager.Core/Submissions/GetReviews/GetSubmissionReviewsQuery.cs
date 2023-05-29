using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Submissions.GetReviews
{
    public class GetSubmissionReviewsQuery : GetEntitiesQuery<ReviewDto>
    {
        public int SubmissionId { get; }

        public GetSubmissionReviewsQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
