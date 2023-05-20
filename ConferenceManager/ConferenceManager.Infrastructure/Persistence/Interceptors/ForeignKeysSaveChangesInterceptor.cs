using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ConferenceManager.Infrastructure.Persistence.Interceptors
{
    public class ForeignKeysSaveChangesInterceptor : SaveChangesInterceptor
    {
        public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        {
            UpdateEntities(eventData.Context);

            return base.SavingChanges(eventData, result);
        }

        public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
        {
            UpdateEntities(eventData.Context);

            return base.SavingChangesAsync(eventData, result, cancellationToken);
        }

        public void UpdateEntities(DbContext? context)
        {
            if (context == null) return;

            foreach (var entry in context.ChangeTracker.Entries<Submission>())
            {
                if (entry.State == EntityState.Modified)
                {
                    entry.Property(p => p.ConferenceId).IsModified = false;
                }
            }

            foreach (var entry in context.ChangeTracker.Entries<Review>())
            {
                if (entry.State == EntityState.Modified)
                {
                    entry.Property(p => p.SubmissionId).IsModified = false;
                }
            }

            foreach (var entry in context.ChangeTracker.Entries<Comment>())
            {
                if (entry.State == EntityState.Modified)
                {
                    entry.Property(p => p.SubmissionId).IsModified = false;
                }
            }
        }
    }
}
