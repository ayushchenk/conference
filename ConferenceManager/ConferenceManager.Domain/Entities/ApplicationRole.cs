using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Domain.Entities
{
    public class ApplicationRole : IdentityRole<int>
    {
        public const string Admin = "Admin";
        public const string Author = "Author";
        public const string Reviewer = "Reviewer";

        public static readonly string[] SupportedRoles =
        {
            Admin,
            Author,
            Reviewer
        };
    }
}
