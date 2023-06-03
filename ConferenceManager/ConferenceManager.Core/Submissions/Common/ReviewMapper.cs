using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Humanizer;

namespace ConferenceManager.Core.Submissions.Common
{
    public class ReviewMapper : IMapper<Review, ReviewDto>
    {
        public ReviewDto Map(Review source)
        {
            return new ReviewDto()
            {
                Id = source.Id,
                SubmissionId = source.SubmissionId,
                ReviewerId = source.CreatedById,
                ReviewerName = source.CreatedBy.FullName,
                ReviewerEmail = source.CreatedBy.Email!,
                Evaluation = source.Evaluation,                
                Confidence = source.Confidence,
                ConfidenceLabel = source.Confidence.Humanize()
            };
        }
    }
}
