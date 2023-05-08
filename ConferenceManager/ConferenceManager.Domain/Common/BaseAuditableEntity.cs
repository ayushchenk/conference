using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Domain.Common;

public abstract class BaseAuditableEntity : BaseEntity
{
    public DateTime CreatedOn { get; set; }

    public int? CreatedById { get; set; }

    public virtual ApplicationUser? CreatedBy { get; set; }

    public DateTime ModifiedOn { get; set; }

    public int? ModifiedById { get; set; }

    public virtual ApplicationUser? ModifiedBy { get; set; }
}
