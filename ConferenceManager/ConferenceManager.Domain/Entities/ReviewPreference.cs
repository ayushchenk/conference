using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class ReviewPreference : BaseIntersectEntity
    {
        public required int SubmissionId { set; get; }

        public required int ReviewerId { set; get; }

        public virtual Submission Submission { set; get; } = null!;

        public virtual ApplicationUser Reviewer { set; get; } = null!;
    }
}
