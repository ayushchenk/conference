using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Conferences.Delete
{
    public class DeleteConferenceCommandHandler : DbContextRequestHandler<DeleteConferenceCommand>
    {
        public DeleteConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public async override Task Handle(DeleteConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.Id, cancellationToken);

            if (conference == null)
            {
                throw new NotFoundException();
            }

            Context.Conferences.Remove(conference);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
