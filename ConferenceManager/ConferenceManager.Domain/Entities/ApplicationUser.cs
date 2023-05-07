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

        public virtual IList<Paper> Papers { set; get; } = null!;

        public virtual IList<Submission> OwnedSubmissions { set; get; } = null!;

        public virtual IList<Submission> ReviewSubmissions { set; get; } = null!;

        public virtual IList<Submission> ReviewPreferences { set; get; } = null!;

        public virtual IList<Conference> ConferenceParticipations { set; get; } = null!;

        public virtual IList<Conference> OwnedConferences { set; get; } = null!;

        public virtual IList<Comment> Comments { set; get; } = null!;

        public virtual IList<Review> Reviews { set; get; } = null!;

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
