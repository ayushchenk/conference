using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class ConferenceParticipantConfiguration : IEntityTypeConfiguration<ConferenceParticipant>
    {
        public void Configure(EntityTypeBuilder<ConferenceParticipant> builder)
        {
            builder.HasKey(x => new { x.UserId, x.ConferenceId });
        }
    }
}
