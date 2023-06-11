using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class CommentConfiguration : BaseAuditableEntityConfiguration<Comment>
    {
        protected override void ConfigureInner(EntityTypeBuilder<Comment> builder)
        {
            builder.Property(x => x.Text)
                .IsRequired()
                .HasMaxLength(1000);
        }
    }
}
