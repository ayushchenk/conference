using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ConferenceManager.Infrastructure.Persistence.Interceptors;

public class AuditableEntitySaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUser;
    private readonly IDateTimeService _dateTime;

    public AuditableEntitySaveChangesInterceptor(
        ICurrentUserService currentUserService,
        IDateTimeService dateTime)
    {
        _currentUser = currentUserService;
        _dateTime = dateTime;
    }

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

        var now = _dateTime.Now;

        foreach (var entry in context.ChangeTracker.Entries<BaseAuditableEntity>())
        {
            if (entry.State == EntityState.Added && entry.Entity.CreatedById == default && entry.Entity.ModifiedById == default)
            {
                entry.Entity.CreatedById = _currentUser.Id;
                entry.Entity.CreatedOn = now;
                entry.Entity.ModifiedById = _currentUser.Id;
                entry.Entity.ModifiedOn = now;
            }

            if (entry.State == EntityState.Modified)
            {
                entry.Property(p => p.CreatedById).IsModified = false;
                entry.Property(p => p.CreatedOn).IsModified = false;
                entry.Entity.ModifiedById = _currentUser.Id;
                entry.Entity.ModifiedOn = now;
            }
        }
    }
}
