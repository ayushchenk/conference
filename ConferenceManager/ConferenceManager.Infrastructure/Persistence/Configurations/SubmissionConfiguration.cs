using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class SubmissionConfiguration : IEntityTypeConfiguration<Submission>
    {
        public void Configure(EntityTypeBuilder<Submission> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Keywords)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Abstract)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(x => x.Status)
                .IsRequired();

            builder.HasMany(x => x.ActualReviewers)
                .WithMany(y => y.ReviewSubmissions)
                .UsingEntity<SubmissionReviewer>();

            builder.HasMany(x => x.AppliedReviewers)
                .WithMany(y => y.ReviewPreferences)
                .UsingEntity<ReviewPreference>();
        }
    }
}
