using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class InviteCodeConfiguration : BaseAuditableEntityConfiguration<InviteCode>
    {
        protected override void ConfigureInner(EntityTypeBuilder<InviteCode> builder)
        {
            builder.Property(x => x.Code)
                .IsRequired()
                .HasMaxLength(20);

            builder.HasIndex(x => x.Code)
                .IsUnique();

            builder.Property(x => x.Role)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
