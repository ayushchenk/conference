using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Account.Common
{
    public class UserDto : IDto
    {
        public int Id { set; get; }

        public required string Email { set; get; }

        public required string FullName { set; get; }

        public required string Country { set; get; }

        public required string Affiliation { set; get; }

        public string? Webpage { set; get; }

        public required string[] Roles { set; get; }
    }
}
