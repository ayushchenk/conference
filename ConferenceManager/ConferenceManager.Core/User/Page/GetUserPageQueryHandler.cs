using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.User.Page
{
    public class GetUserPageQueryHandler : DbContextRequestHandler<GetUserPageQuery, EntityPageResponse<UserDto>>
    {
        public GetUserPageQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<UserDto>> Handle(GetUserPageQuery request, CancellationToken cancellationToken)
        {
            var source = Context.Users.OrderBy(x => x.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(source, request.PageIndex, request.PageSize);

            return new EntityPageResponse<UserDto>()
            {
                Items = page.Select(Mapper.Map<ApplicationUser, UserDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages,
            };
        }
    }
}
