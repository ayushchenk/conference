using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Humanizer;

namespace ConferenceManager.Core.Submissions.Common
{
    public class ReviewMapper : IMapper<Review, ReviewDto>
    {
        private readonly ICurrentUserService _currentUser;

        public ReviewMapper(ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
        }

        public ReviewDto Map(Review source)
        {
            return new ReviewDto()
            {
                Id = source.Id,
                SubmissionId = source.SubmissionId,
                ReviewerId = source.CreatedById,
                ReviewerName = source.CreatedBy.FullName,
                ReviewerEmail = source.CreatedBy.Email!,
                Score = source.Score,
                Evaluation = source.Evaluation,
                Confidence = source.Confidence,
                ConfidenceLabel = source.Confidence.Humanize(),
                IsAuthor = _currentUser.IsAuthorOf(source)
            };
        }
    }
}
