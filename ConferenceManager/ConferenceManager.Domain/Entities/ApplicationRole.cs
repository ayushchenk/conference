using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Domain.Entities
{
    public class ApplicationRole : IdentityRole<int>
    {
        public const string GlobalAdmin = "Global Admin";
        public const string ConferenceAdmin = "Conference Admin";
        public const string Author = "Author";
        public const string Reviwer = "Reviewer";

        public static readonly string[] SupportedRoles =
        {
            GlobalAdmin,
            ConferenceAdmin,
            Author,
            Reviwer
        };
    }
}
