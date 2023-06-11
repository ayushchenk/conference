using ConferenceManager.Domain.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public abstract class BaseAuditableEntityConfiguration<TEntity> : IEntityTypeConfiguration<TEntity> where TEntity : BaseAuditableEntity
    {
        public void Configure(EntityTypeBuilder<TEntity> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(e => e.CreatedOn)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            builder.Property(e => e.ModifiedOn)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            ConfigureInner(builder);
        }

        protected abstract void ConfigureInner(EntityTypeBuilder<TEntity> builder);
    }
}
