using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.User.Page
{
    public class GetUserPageQueryHandler : DbContextRequestHandler<GetUserPageQuery, EntityPageResponse<UserDto>>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUserPageQueryHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper,
            UserManager<ApplicationUser> userManager) : base(context, currentUser, mapper)
        {
            _userManager = userManager;
        }

        public override async Task<EntityPageResponse<UserDto>> Handle(GetUserPageQuery request, CancellationToken cancellationToken)
        {
            var source = Context.Users.OrderBy(x => x.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(source, request.PageIndex, request.PageSize);

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
                TotalPages = page.TotalPages,
            };
        }
    }
}
