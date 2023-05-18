using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Get
{
    public class GetConferenceQueryHandler : DbContextRequestHandler<GetConferenceQuery, ConferenceDto?>
    {
        private readonly IMapper<Conference, ConferenceDto> _mapper;

        public GetConferenceQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMapper<Conference, ConferenceDto> mapper) : base(context, currentUser)
        {
            _mapper = mapper;
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

            return _mapper.Map(conference);
        }
    }
}
