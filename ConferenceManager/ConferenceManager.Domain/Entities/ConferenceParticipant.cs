using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class ConferenceParticipant : BaseIntersectEntity
    {
        public required int UserId { set; get; }

        public required int ConferenceId { set; get; }

        public virtual ApplicationUser User { set; get; } = null!;

        public virtual Conference Conference { set; get; } = null!;
    }
}
