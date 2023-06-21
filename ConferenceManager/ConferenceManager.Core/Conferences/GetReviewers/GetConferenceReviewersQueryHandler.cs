using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetReviewers
{
    public class GetConferenceReviewersQueryHandler : DbContextRequestHandler<GetConferenceReviewersQuery, EntityPageResponse<UserDto>>
    {
        public GetConferenceReviewersQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<UserDto>> Handle(GetConferenceReviewersQuery request, CancellationToken cancellationToken)
        {
            var reviewersIds = Context.UserRoles
                .Where(r => r.ConferenceId == request.ConferenceId && r.Role.Name == ApplicationRole.Reviewer)
                .Select(r => r.UserId);

            var reviewers = Context.Users
                .Where(u => reviewersIds.Contains(u.Id))
                .OrderBy(u => u.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(reviewers, request.PageIndex, request.PageSize);

            return new EntityPageResponse<UserDto>()
            {
                Items = page.Select(Mapper.Map<ApplicationUser, UserDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages,
            };
        }
    }
}
