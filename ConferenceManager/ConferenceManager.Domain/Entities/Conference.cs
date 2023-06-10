using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class Conference : BaseAuditableEntity
    {
        public required string Title { set; get; }

        public required string Acronym { set; get; }

        public required string Organizer { set; get; }

        public required DateTime StartDate { set; get; }

        public required DateTime EndDate { set; get; }

        public string? Keywords { set; get; }

        public string? Abstract { set; get; }

        public string? Webpage { set; get; }

        public string? Venue { set; get; }

        public string? City { set; get; }

        public string? PrimaryResearchArea { set; get; }

        public string? SecondaryResearchArea { set; get; }

        public string? AreaNotes { set; get; }

        public string? OrganizerWebpage { set; get; }

        public string? ContactPhoneNumber { set; get; }

        public bool IsAnonymizedFileRequired { set; get; }

        public virtual IList<Submission> Submissions { set; get; } = null!;

        public virtual IList<ApplicationUser> Participants { set; get; } = null!;
    }
}
