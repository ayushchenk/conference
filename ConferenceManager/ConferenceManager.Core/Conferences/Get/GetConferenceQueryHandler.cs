using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Get
{
    public class GetConferenceQueryHandler : DbContextRequestHandler<GetConferenceQuery, ConferenceDto?>
    {
        public GetConferenceQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<ConferenceDto?> Handle(GetConferenceQuery request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.Id, cancellationToken);

            if (conference == null)
            {
                return null;
            }

            var participantsIds = conference.Participants.Select(u => u.Id);

            if (!CurrentUser.IsGlobalAdmin && !participantsIds.Contains(CurrentUser.Id))
            {
                throw new ForbiddenException();
            }

            return Mapper.Map<Conference, ConferenceDto>(conference);
        }
    }
}
