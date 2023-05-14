using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;

namespace ConferenceManager.Core.Conferences.Commands.Delete
{
    public class DeleteConferenceCommandHandler : DbContextRequestHandler<DeleteConferenceCommand, DeleteEntityResponse>
    {
        public DeleteConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMapper mapper) : base(context, currentUser, mapper)
        {
        }

        public async override Task<DeleteEntityResponse> Handle(DeleteConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.Id, cancellationToken);

            if (conference == null)
            {
                return new DeleteEntityResponse(false);
            }

            Context.Conferences.Remove(conference);
            await Context.SaveChangesAsync(cancellationToken);

            return new DeleteEntityResponse(true);
        }
    }
}
