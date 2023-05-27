using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.CreateReview
{
    public class CreateReviewCommand : ICreateEntityCommand
    {
        [JsonIgnore]
        public int SubmissionId { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Evaluation { get; init; } = null!;

        [Required]
        public ReviewConfidence Confidence { get; init; }
    }
}
