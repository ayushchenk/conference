using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class SubmissionReviewerConfiguration : IEntityTypeConfiguration<SubmissionReviewer>
    {
        public void Configure(EntityTypeBuilder<SubmissionReviewer> builder)
        {
            builder.HasKey(x => new { x.SubmissionId, x.ReviewerId });
        }
    }
}
