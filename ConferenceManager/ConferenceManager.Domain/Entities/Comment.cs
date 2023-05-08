using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class Comment : BaseAuditableEntity
    {
        public required int UserId { set; get; }

        public required int SubmissionId { set; get; }

        public required string Text { set; get; }

        public virtual Submission Submission { set; get; } = null!;
    }
}
