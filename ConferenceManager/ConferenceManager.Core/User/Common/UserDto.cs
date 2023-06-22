using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Account.Common
{
    public class UserDto : IDto
    {
        public required int Id { set; get; }

        public required string Email { set; get; }

        public required string FullName { set; get; }

        public required string Country { set; get; }

        public required string Affiliation { set; get; }

        public string? Webpage { set; get; }

        public required bool IsAdmin { set; get; }

        public bool HasPreference { set; get; }

        public required Dictionary<int, string[]> Roles { set; get; }
    }
}
