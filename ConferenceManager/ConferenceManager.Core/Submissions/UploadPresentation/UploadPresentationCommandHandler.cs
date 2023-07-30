using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UploadPresentation
{
    public class UploadPresentationCommandHandler : DbContextRequestHandler<UploadPresentationCommand>
    {
        public UploadPresentationCommandHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(UploadPresentationCommand request, CancellationToken cancellationToken)
        {
            var paper = Mapper.Map<UploadPresentationCommand, Paper>(request);

            Context.Papers.Add(paper);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
