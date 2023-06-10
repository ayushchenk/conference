using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class ConferenceConfiguration : IEntityTypeConfiguration<Conference>
    {
        public void Configure(EntityTypeBuilder<Conference> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

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
        }
    }
}
