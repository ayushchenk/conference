using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class Paper : BaseAuditableEntity
    {
        public required int AuthorId { set; get; }

        public required int SubmissionId { set; get; }

        public required byte[] File { set; get; }

        public virtual ApplicationUser Author { set; get; } = null!;

        public virtual Submission Submission { set; get; } = null!;
    }
}
