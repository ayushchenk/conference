using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetParticipants
{
    public class GetConferenceParticipantsQueryHandler : DbContextRequestHandler<GetConferenceParticipantsQuery, EntityPageResponse<UserDto>>
    {
        public GetConferenceParticipantsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<UserDto>> Handle(GetConferenceParticipantsQuery request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.ConferenceId, cancellationToken);

            if (conference == null)
            {
                throw new NotFoundException("Conference not found");
            }

            var participants = Context.Users
                .Where(u => u.ConferenceParticipations.Select(c => c.Id).Contains(conference.Id))
                .OrderBy(u => u.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(participants, request.PageIndex, request.PageSize);

            return new EntityPageResponse<UserDto>()
            {
                Items = page.Select(Mapper.Map<ApplicationUser, UserDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages
            };
        }
    }
}
