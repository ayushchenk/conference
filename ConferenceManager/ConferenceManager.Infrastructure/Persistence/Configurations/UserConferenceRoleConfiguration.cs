using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ConferenceManager.Infrastructure.Persistence.Configurations
{
    public class UserConferenceRoleConfiguration : IEntityTypeConfiguration<UserConferenceRole>
    {
        public void Configure(EntityTypeBuilder<UserConferenceRole> builder)
        {
            builder.HasKey(x => new { x.UserId, x.RoleId, x.ConferenceId });

            builder.HasOne(x => x.User)               
                .WithMany(y => y.ConferenceRoles)
                .HasForeignKey(y => y.UserId)
                .IsRequired();

            builder.HasOne(x => x.Role)
                .WithMany(y => y.UserRoles)
                .HasForeignKey(y => y.RoleId)
                .IsRequired();

            builder.HasOne(x => x.Conference)
                .WithMany(y => y.UserRoles)
                .HasForeignKey(y => y.ConferenceId)
                .IsRequired();
        }
    }
}
