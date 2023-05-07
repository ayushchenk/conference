using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class ReviewPreferenceConfiguration : IEntityTypeConfiguration<ReviewPreference>
    {
        public void Configure(EntityTypeBuilder<ReviewPreference> builder)
        {
            builder.HasKey(x => new { x.SubmissionId, x.ReviewerId });
        }
    }
}
