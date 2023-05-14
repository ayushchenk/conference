using ConferenceManager.Domain.Common;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Domain.Entities
{
    public class Review : BaseAuditableEntity
    {
        public required int SubmissionId { set; get; }

        public required string Evaluation { set; get; }

        public required ReviewConfidence Confidence { set; get; }

        public virtual Submission Submission { set; get; } = null!;
    }
}
