using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Persistence.Interceptors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ConferenceManager.Infrastructure.Persistence
{
    public class ApplicationDbContext :
        IdentityDbContext<
            ApplicationUser, ApplicationRole, int,
            IdentityUserClaim<int>, UserConferenceRole, IdentityUserLogin<int>,
            IdentityRoleClaim<int>, IdentityUserToken<int>>,
        IApplicationDbContext
    {
        private readonly DomainEventsSaveChangesInterceptor _domainEventsInterceptor;
        private readonly AuditableEntitySaveChangesInterceptor _auditableEntityInterceptor;
        private readonly ForeignKeysSaveChangesInterceptor _foreignKeysInterceptor;

        public DbSet<Conference> Conferences => Set<Conference>();

        public DbSet<Paper> Papers => Set<Paper>();

        public DbSet<Comment> Comments => Set<Comment>();

        public DbSet<Review> Reviews => Set<Review>();

        public DbSet<Submission> Submissions => Set<Submission>();

        public DbSet<SubmissionReviewer> SubmissionReviewers => Set<SubmissionReviewer>();

        public DbSet<ReviewPreference> ReviewPreferences => Set<ReviewPreference>();

        public DbSet<ConferenceParticipant> ConferenceParticipants => Set<ConferenceParticipant>();

        public DbSet<InviteCode> InviteCodes => Set<InviteCode>();

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            DomainEventsSaveChangesInterceptor domainEventsInterceptor,
            AuditableEntitySaveChangesInterceptor auditableEntityInterceptor,
            ForeignKeysSaveChangesInterceptor foreignKeysInterceptor
            ) : base(options)
        {
            _domainEventsInterceptor = domainEventsInterceptor;
            _auditableEntityInterceptor = auditableEntityInterceptor;
            _foreignKeysInterceptor = foreignKeysInterceptor;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(
                _domainEventsInterceptor,
                _auditableEntityInterceptor,
                _foreignKeysInterceptor);
        }
    }
}
