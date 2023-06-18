using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class InviteCode : BaseAuditableEntity
    {
        public required int ConferenceId { set; get; }

        public required string Code { set; get; }

        public required string Role { set; get; }

        public virtual Conference Conference { set; get; } = null!;
    }
}
