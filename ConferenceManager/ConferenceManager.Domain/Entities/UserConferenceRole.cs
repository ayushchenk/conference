using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Domain.Entities
{
    public class UserConferenceRole : IdentityUserRole<int>
    {
        public int ConferenceId { get; set; }

        public virtual Conference Conference { get; set; } = null!;

        public virtual ApplicationUser User { get; set; } = null!;

        public virtual ApplicationRole Role { get; set; } = null!;
    }
}
