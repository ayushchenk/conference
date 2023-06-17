using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class ConferenceConfiguration : BaseAuditableEntityConfiguration<Conference>
    {
        protected override void ConfigureInner(EntityTypeBuilder<Conference> builder)
        {
            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Acronym)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(x => x.Organizer)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.StartDate)
                .IsRequired();

            builder.Property(x => x.EndDate)
                .IsRequired();

            builder.Property(x => x.Keywords)
                .IsRequired(false)
                .HasMaxLength(100);

            builder.Property(x => x.Abstract)
               .IsRequired(false)
               .HasMaxLength(1000);

            builder.Property(x => x.Webpage)
                .IsRequired(false)
                .HasMaxLength(100);

            builder.Property(x => x.Venue)
                .IsRequired(false)
                .HasMaxLength(100);

            builder.Property(x => x.City)
                .IsRequired(false)
                .HasMaxLength(50);

            builder.Property(x => x.ResearchAreas)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(x => x.AreaNotes)
                .IsRequired(false)
                .HasMaxLength(500);

            builder.Property(x => x.OrganizerWebpage)
                .IsRequired(false)
                .HasMaxLength(100);

            builder.Property(x => x.ContactPhoneNumber)
                .IsRequired(false)
                .HasMaxLength(20);

            builder.Property(x => x.IsAnonymizedFileRequired)
                .IsRequired();

            builder.Property(x => x.AuthorInviteCode)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(x => x.ReviewerInviteCode)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(x => x.ChairInviteCode)
                .IsRequired()
                .HasMaxLength(10);

            builder.HasMany(x => x.UserRoles)
                .WithOne(y => y.Conference)
                .HasForeignKey(y => y.ConferenceId)
                .IsRequired(false);
        }
    }
}
