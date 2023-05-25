using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
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
            var participants = Context.Users
                .Where(u => u.ConferenceParticipations.Select(c => c.Id).Contains(request.ConferenceId))
                .OrderBy(u => u.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(participants, request.PageIndex, request.PageSize);

            var dtos = await Task.WhenAll(page.Select(async (u) =>
            {
                var dto = Mapper.Map<ApplicationUser, UserDto>(u);
                dto.Roles = await _userManager.GetRolesAsync(u);
                return dto;
            }));

            return new EntityPageResponse<UserDto>()
            {
                Items = dtos,
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages
            };
        }
    }
}
