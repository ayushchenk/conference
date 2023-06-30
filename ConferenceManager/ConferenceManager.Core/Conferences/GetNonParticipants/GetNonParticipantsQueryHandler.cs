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

            var nonParticipants = Context.Users.Where(u => !participants.Contains(u.Id));

            if (!string.IsNullOrEmpty(request.Query))
            {
                nonParticipants = nonParticipants.Where(u => 
                    u.Email!.Contains(request.Query)
                    || u.FirstName.Contains(request.Query)
                    || u.LastName.Contains(request.Query));
            }

            var orderedNonParticipants = nonParticipants.OrderBy(u => u.Id);

            var page = await PaginatedList<ApplicationUser>.CreateAsync(orderedNonParticipants, request.PageIndex, request.PageSize);

            return new EntityPageResponse<UserDto>()
            {
                Items = page.Items.Select(Mapper.Map<ApplicationUser, UserDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages,
            };
        }
    }
}
