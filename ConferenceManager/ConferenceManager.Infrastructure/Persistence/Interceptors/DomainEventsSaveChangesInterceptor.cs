using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ConferenceManager.Infrastructure.Persistence.Interceptors
{
    public class DomainEventsSaveChangesInterceptor : SaveChangesInterceptor
    {
        private readonly IMediator _mediator;

        public DomainEventsSaveChangesInterceptor(IMediator mediator)
        {
            _mediator = mediator;
        }

        public override int SavedChanges(SaveChangesCompletedEventData eventData, int result)
        {
            DispatchEvents(eventData.Context).GetAwaiter();

            return base.SavedChanges(eventData, result);
        }

        public override async ValueTask<int> SavedChangesAsync(SaveChangesCompletedEventData eventData, int result, CancellationToken cancellationToken = default)
        {
            await DispatchEvents(eventData.Context);

            return await base.SavedChangesAsync(eventData, result, cancellationToken);
        }

        private async Task DispatchEvents(DbContext? context)
        {
            if (context == null)
            {
                return;
            }

            await _mediator.DispatchDomainEvents(context);
        }
    }
}
