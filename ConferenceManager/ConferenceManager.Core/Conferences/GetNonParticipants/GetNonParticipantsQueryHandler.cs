using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetNonParticipants
{
    public class GetNonParticipantsQueryHandler : DbContextRequestHandler<GetNonParticipantsQuery, EntityPageResponse<UserDto>>
    {
        public GetNonParticipantsQueryHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<UserDto>> Handle(GetNonParticipantsQuery request, CancellationToken cancellationToken)
        {
            var participants = Context.ConferenceParticipants
                .Where(p => p.ConferenceId == request.ConferenceId)
                .Select(p => p.UserId)
                .ToArray();

            var users = Context.Users.Where(u => !participants.Contains(u.Id));

            if (!string.IsNullOrEmpty(request.Query))
            {
                users = users.Where(u => u.Email!.Contains(request.Query, StringComparison.InvariantCultureIgnoreCase)
                    || u.FullName.Contains(request.Query, StringComparison.InvariantCultureIgnoreCase));
            }

            var orderedUsers = users.OrderBy(u => u.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(orderedUsers, request.PageIndex, request.PageSize);

            return new EntityPageResponse<UserDto>()
            {
                Items = page.Items.Select(Mapper.Map<ApplicationUser, UserDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages,
            };
        }
    }
}
