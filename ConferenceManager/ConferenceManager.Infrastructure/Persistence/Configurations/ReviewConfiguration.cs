using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class ReviewConfiguration : BaseAuditableEntityConfiguration<Review>
    {
        protected override void ConfigureInner(EntityTypeBuilder<Review> builder)
        {
            builder.Property(x => x.Evaluation)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(x => x.Score)
                .IsRequired();

            builder.Property(x => x.Confidence)
                .IsRequired();
        }
    }
}
