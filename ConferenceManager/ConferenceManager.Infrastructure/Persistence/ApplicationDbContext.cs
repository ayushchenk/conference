using Castle.Components.DictionaryAdapter.Xml;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Persistence.Interceptors;
using MediatR;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace ConferenceManager.Infrastructure.Persistence
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>, IApplicationDbContext
    {
        private readonly IMediator _mediator;
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

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            AuditableEntitySaveChangesInterceptor auditableEntityInterceptor,
            ForeignKeysSaveChangesInterceptor foreignKeysInterceptor,
            IMediator mediator
            ) : base(options)
        {
            _auditableEntityInterceptor = auditableEntityInterceptor;
            _foreignKeysInterceptor = foreignKeysInterceptor;
            _mediator = mediator;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.AddInterceptors(_auditableEntityInterceptor, _foreignKeysInterceptor);
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _mediator.DispatchDomainEvents(this);

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
