using ConferenceManager.Domain.Common;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Domain.Entities
{
    public class Submission : BaseAuditableEntity
    {
        public int ConferenceId { set; get; }

        public required string Title { set; get; }

        public required string Keywords { set; get; }

        public required string Abstract { set; get; }

        public required string ResearchAreas { set; get; }

        public required SubmissionStatus Status { set; get; }

        public bool IsValidForReturn => Status == SubmissionStatus.Created || Status == SubmissionStatus.Updated;

        public bool IsValidForUpdate => Status == SubmissionStatus.Created || Status == SubmissionStatus.Returned;

        public bool IsValidForReview => Status == SubmissionStatus.Created || Status == SubmissionStatus.Updated || Status == SubmissionStatus.InReview;

        public bool IsClosed => Status == SubmissionStatus.Accepted || Status == SubmissionStatus.Rejected;

        public virtual Conference Conference { set; get; } = null!;

        public virtual IList<ApplicationUser> ActualReviewers { set; get; } = null!;

        public virtual IList<ApplicationUser> AppliedReviewers { set; get; } = null!;

        public virtual IList<Review> Reviews { set; get; } = null!;

        public virtual IList<Comment> Comments { set; get; } = null!;

        public virtual IList<Paper> Papers { set; get; } = null!;

        public bool HasReviewFrom(int userId)
        {
            return Reviews
                .Select(r => r.CreatedById)
                .Contains(userId);
        }
    }
}
