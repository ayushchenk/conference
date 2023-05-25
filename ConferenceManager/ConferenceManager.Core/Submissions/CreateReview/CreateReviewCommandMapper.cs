using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.CreateReview
{
    public class CreateReviewCommandMapper : IMapper<CreateReviewCommand, Review>
    {
        public Review Map(CreateReviewCommand source)
        {
            return new Review()
            {
                SubmissionId = source.SubmissionId,
                Evaluation = source.Evaluation,
                Confidence = source.Confidence
            };
        }
    }
}
