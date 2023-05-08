using ConferenceManager.Domain.Common;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConferenceManager.Domain.Entities
{
    public class ApplicationUser : IdentityUser<int>, IEntity
    {
        private readonly List<BaseEvent> _domainEvents = new();

        public required string FirstName { set; get; }

        public required string LastName { set; get; }

        public required string Country { set; get; }

        public required string Affiliation { set; get; }

        public string? Webpage { set; get; }

        public virtual IList<Paper> CreatedPapers { set; get; } = null!;

        public virtual IList<Paper> ModifiedPapers { set; get; } = null!;

        public virtual IList<Submission> CreatedSubmissions { set; get; } = null!;

        public virtual IList<Submission> ModifiedSubmissions { set; get; } = null!;

        public virtual IList<Submission> SubmissionsForReview { set; get; } = null!;

        public virtual IList<Submission> ReviewPreferences { set; get; } = null!;

        public virtual IList<Conference> ConferenceParticipations { set; get; } = null!;

        public virtual IList<Conference> CreatedConferences { set; get; } = null!;

        public virtual IList<Conference> ModifiedConferences { set; get; } = null!;

        public virtual IList<Comment> CreatedComments { set; get; } = null!;

        public virtual IList<Comment> ModifiedComments { set; get; } = null!;

        public virtual IList<Review> CreatedReviews { set; get; } = null!;

        public virtual IList<Review> ModifiedReviews { set; get; } = null!;

        [NotMapped]
        public IReadOnlyCollection<BaseEvent> DomainEvents => _domainEvents.AsReadOnly();

        public void AddDomainEvent(BaseEvent domainEvent)
        {
            _domainEvents.Add(domainEvent);
        }

        public void RemoveDomainEvent(BaseEvent domainEvent)
        {
            _domainEvents.Remove(domainEvent);
        }

        public void ClearDomainEvents()
        {
            _domainEvents.Clear();
        }
    }
}
