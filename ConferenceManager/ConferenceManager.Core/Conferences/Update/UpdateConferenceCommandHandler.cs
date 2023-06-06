using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandHandler : DbContextRequestHandler<UpdateConferenceCommand>
    {
        public UpdateConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(UpdateConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = Mapper.Map<UpdateConferenceCommand, Conference>(request);

            Context.Conferences.Update(conference);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
