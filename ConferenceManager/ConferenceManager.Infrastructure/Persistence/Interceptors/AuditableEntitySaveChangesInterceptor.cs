using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ConferenceManager.Infrastructure.Persistence.Interceptors;

public class AuditableEntitySaveChangesInterceptor : SaveChangesInterceptor
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTimeService _dateTime;

    public AuditableEntitySaveChangesInterceptor(
        ICurrentUserService currentUserService,
        IDateTimeService dateTime)
    {
        _currentUserService = currentUserService;
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

        foreach (var entry in context.ChangeTracker.Entries<BaseAuditableEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedById = _currentUserService.Id;
                entry.Entity.CreatedOn = _dateTime.Now;
                entry.Entity.ModifiedById = _currentUserService.Id;
                entry.Entity.ModifiedOn = _dateTime.Now;
            } 

            if (entry.State == EntityState.Modified)
            {
                entry.Property(p => p.CreatedById).IsModified = false;
                entry.Property(p => p.CreatedOn).IsModified = false;
                entry.Entity.ModifiedById = _currentUserService.Id;
                entry.Entity.ModifiedOn = _dateTime.Now;
            }
        }
    }
}
