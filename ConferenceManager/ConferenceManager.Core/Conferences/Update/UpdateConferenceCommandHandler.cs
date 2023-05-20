using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandHandler : DbContextRequestHandler<UpdateConferenceCommand, UpdateEntityResponse>
    {
        public UpdateConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<UpdateEntityResponse> Handle(UpdateConferenceCommand request, CancellationToken cancellationToken)
        {
            var oldConference = await Context.Conferences
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (oldConference == null)
            {
                throw new NotFoundException();
            }

            var participantIds = Context.ConferenceParticipants
                .Where(c => c.ConferenceId == request.Id)
                .Select(c => c.UserId);

            if (!CurrentUser.IsGlobalAdmin && !participantIds.Contains(CurrentUser.Id))
            {
                throw new ForbiddenException();
            }

            var newConference = Mapper.Map<UpdateConferenceCommand, Conference>(request);

            Context.Conferences.Update(newConference);
            await Context.SaveChangesAsync(cancellationToken);

            return new UpdateEntityResponse(true);
        }
    }
}
