using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class PaperConfiguration : BaseAuditableEntityConfiguration<Paper>
    {
        protected override void ConfigureInner(EntityTypeBuilder<Paper> builder)
        {
            builder.Property(x => x.File)
                .IsRequired();

            builder.Property(x => x.FileName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Type)
                .IsRequired();
        }
    }
}
