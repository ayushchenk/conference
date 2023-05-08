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
        }
    }
}
