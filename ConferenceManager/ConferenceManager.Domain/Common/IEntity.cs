namespace ConferenceManager.Domain.Common
{
    public interface IEntity
    {
        public int Id { set; get; }

        public IReadOnlyCollection<BaseEvent> DomainEvents { get; }

        public void AddDomainEvent(BaseEvent domainEvent);

        public void RemoveDomainEvent(BaseEvent domainEvent);

        public void ClearDomainEvents();
    }
}
