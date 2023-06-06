using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UpdateReview
{
    public class UpdateReviewCommandMapper : IMapper<UpdateReviewCommand, Review>
    {
        public Review Map(UpdateReviewCommand source)
        {
            return new Review()
            {
                Id = source.Id,
                SubmissionId = 0,
                Confidence = source.Confidence,
                Evaluation = source.Evaluation,
                Score = source.Score
            };
        }
    }
}
