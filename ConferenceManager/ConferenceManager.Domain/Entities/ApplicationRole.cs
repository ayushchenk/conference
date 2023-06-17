using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Domain.Entities
{
    public class ApplicationRole : IdentityRole<int>
    {
        public const string Admin = "Admin";
        public const string Author = "Author";
        public const string Reviewer = "Reviewer";
        public const string Chair = "Chair";

        public static readonly string[] SupportedRoles =
        {
            Author,
            Reviewer,
            Chair
        };

        public virtual IList<UserConferenceRole> UserRoles { get; set; } = null!;
    }
}
