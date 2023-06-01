using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Core.Submissions.Common
{
    public class ReviewDto : IDto
    {
        public required int Id { set; get; }

        public required int SubmissionId { set; get; }

        public required int ReviewerId { set; get; }

        public required string ReviewerName { set; get; } = null!;

        public required string ReviewerEmail { set; get; } = null!;

        public required string Evaluation { set; get; } = null!;

        public required ReviewConfidence Confidence { set; get; }

        public required string ConfidenceLabel { set; get; } = null!;
    }
}
