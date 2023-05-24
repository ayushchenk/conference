using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.Conferences.GetParticipants
{
    public class GetConferenceParticipantsQueryHandler : DbContextRequestHandler<GetConferenceParticipantsQuery, EntityPageResponse<UserDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetConferenceParticipantsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            UserManager<ApplicationUser> userManager) : base(context, currentUser, mapper)
        {
            _userManager = userManager;
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

            var dtos = page.Select(async (u) => 
            {
                var dto = Mapper.Map<ApplicationUser, UserDto>(u);
                dto.Roles = await _userManager.GetRolesAsync(u);
                return dto;
            });

            return new EntityPageResponse<UserDto>()
            {
                Items = dtos.Select(d => d.Result),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages
            };
        }
    }
}
