using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Ignore(x => x.FullName);

            builder.Property(x => x.FirstName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.LastName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.Country)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.Affiliation)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Webpage)
                .IsRequired(false)
                .HasMaxLength(100);

            builder.HasMany(x => x.CreatedComments)
                .WithOne(y => y.CreatedBy)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.ModifiedComments)
                .WithOne(y => y.ModifiedBy)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.CreatedConferences)
                .WithOne(y => y.CreatedBy)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.ModifiedConferences)
                .WithOne(y => y.ModifiedBy)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.CreatedPapers)
                .WithOne(y => y.CreatedBy)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.ModifiedPapers)
                .WithOne(y => y.ModifiedBy)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.CreatedReviews)
                .WithOne(y => y.CreatedBy)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.ModifiedReviews)
                .WithOne(y => y.ModifiedBy)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.CreatedSubmissions)
               .WithOne(y => y.CreatedBy)
               .OnDelete(DeleteBehavior.NoAction);
            builder.HasMany(x => x.ModifiedSubmissions)
                .WithOne(y => y.ModifiedBy)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.SubmissionsForReview)
                .WithMany(y => y.ActualReviewers)
                .UsingEntity<SubmissionReviewer>();

            builder.HasMany(x => x.ReviewPreferences)
                .WithMany(y => y.AppliedReviewers)
                .UsingEntity<ReviewPreference>();

            builder.HasMany(x => x.ConferenceParticipations)
                .WithMany(y => y.Participants)
                .UsingEntity<ConferenceParticipant>();
        }
    }
}
