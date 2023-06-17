using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

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
            var oldConference = await Context.Conferences
                .AsNoTracking()
                .FirstAsync(c => c.Id == request.Id, cancellationToken);
            var newConference = Mapper.Map<UpdateConferenceCommand, Conference>(request);

            PersistCodes(oldConference, newConference);

            Context.Conferences.Update(newConference);
            await Context.SaveChangesAsync(cancellationToken);
        }

        private void PersistCodes(Conference old, Conference updated)
        {
            updated.AuthorInviteCode = old.AuthorInviteCode;
            updated.ReviewerInviteCode = old.ReviewerInviteCode;
            updated.ChairInviteCode = old.ChairInviteCode;
        }
    }
}
