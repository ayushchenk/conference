using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Conferences.Common
{
    public class ConferenceDto : IDto
    {
        public required int Id { get; set; }

        public required string Title { get; set; }

        public required string Acronym { get; set; }

        public required string Organizer { get; set; }

        public required DateTime StartDate { get; set; }

        public required DateTime EndDate { get; set; }

        public string? Keywords { get; set; }

        public string? Abstract { get; set; }

        public string? Webpage { get; set; }

        public string? Venue { get; set; }

        public string? City { get; set; }

        public required string[] ResearchAreas { get; set; }

        public string? AreaNotes { get; set; }

        public string? OrganizerWebpage { get; set; }

        public string? ContactPhoneNumber { get; set; }

        public required bool IsAnonymizedFileRequired { get; set; }
    }
}
