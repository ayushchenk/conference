using Microsoft.EntityFrameworkCore;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<ApplicationUser> Users { get; }

        public DbSet<Conference> Conferences { get; }

        public DbSet<Paper> Papers { get; }

        public DbSet<Comment> Comments { get; }

        public DbSet<Review> Reviews { get; }

        public DbSet<Submission> Submissions { get; }

        public DbSet<SubmissionReviewer> SubmissionReviewers { get; }

        public DbSet<ReviewPreference> ReviewPreferences { get; }

        public DbSet<ConferenceParticipant> ConferenceParticipants { get; }

        public DbSet<UserConferenceRole> UserRoles { get; }

        public DbSet<InviteCode> InviteCodes { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
