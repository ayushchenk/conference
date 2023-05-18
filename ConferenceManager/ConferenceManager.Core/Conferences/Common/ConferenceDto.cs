using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Conferences.Common
{
    public class ConferenceDto : IDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Acronyn { get; set; } = null!;

        public string Organizer { get; set; } = null!;

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string? Keywords { get; set; }

        public string? Abstract { get; set; }

        public string? Webpage { get; set; }

        public string? Venue { get; set; }

        public string? City { get; set; }

        public string? PrimaryResearchArea { get; set; }

        public string? SecondaryResearchArea { get; set; }

        public string? AreaNotes { get; set; }

        public string? OrganizerWebpage { get; set; }

        public string? ContactPhoneNumber { get; set; }
    }
}
