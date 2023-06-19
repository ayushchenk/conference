using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Conferences.Model
{
    public class ConferenceCommandBase
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = null!;

        [Required]
        [MaxLength(20)]
        public string Acronym { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Organizer { get; set; } = null!;

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [MaxLength(100)]
        public string? Keywords { get; set; }

        [MaxLength(1000)]
        public string? Abstract { get; set; }

        [MaxLength(100)]
        public string? Webpage { get; set; }

        [MaxLength(100)]
        public string? Venue { get; set; }

        [MaxLength(50)]
        public string? City { get; set; }

        [Required]
        public string[] ResearchAreas { get; set; } = null!;

        [MaxLength(500)]
        public string? AreaNotes { get; set; }

        [MaxLength(100)]
        public string? OrganizerWebpage { get; set; }

        [MaxLength(20)]
        public string? ContactPhoneNumber { get; set; }

        [Required]
        public bool IsAnonymizedFileRequired { get; set; }
    }
}
