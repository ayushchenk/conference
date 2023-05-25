using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Domain.Enums;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.CreateReview
{
    public class CreateReviewCommand : ICreateEntityCommand
    {
        [JsonIgnore]
        public int SubmissionId { get; set; }

        public string Evaluation { get; init; } = null!;

        public ReviewConfidence Confidence { get; init; }
    }
}
