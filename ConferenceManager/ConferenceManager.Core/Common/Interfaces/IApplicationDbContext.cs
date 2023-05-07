using Microsoft.EntityFrameworkCore;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        public DbSet<Conference> Conferences { get; }

        public DbSet<Paper> Papers { get; }

        public DbSet<Comment> Comments { get; }

        public DbSet<Review> Reviews { get; }

        public DbSet<Submission> Submissions { get; }

        public DbSet<SubmissionReviewer> SubmissionReviewers { get; }

        public DbSet<ReviewPreference> ReviewPreferences { get; }

        public DbSet<ConferenceParticipant> ConferenceParticipants { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
