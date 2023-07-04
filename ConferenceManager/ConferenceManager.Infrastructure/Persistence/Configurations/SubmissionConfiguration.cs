using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class SubmissionConfiguration : BaseAuditableEntityConfiguration<Submission>
    {
        protected override void ConfigureInner(EntityTypeBuilder<Submission> builder)
        {
            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Keywords)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Abstract)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(x => x.ResearchAreas)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(x => x.Status)
                .IsRequired();

            builder.Ignore(x => x.IsValidForReturn);
            builder.Ignore(x => x.IsValidForUpdate);
            builder.Ignore(x => x.IsValidForReview);
            builder.Ignore(x => x.IsClosed);
        }
    }
}
