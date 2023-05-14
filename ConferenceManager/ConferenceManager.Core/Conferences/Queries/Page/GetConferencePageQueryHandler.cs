using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;
using System.Runtime.CompilerServices;

namespace ConferenceManager.Core.Conferences.Queries.Page
{
    public class GetConferencePageQueryHandler : DbContextRequestHandler<GetConferencePageQuery, GetEntityPageResponse<ConferenceDto>>
    {
        public GetConferencePageQueryHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMapper mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<GetEntityPageResponse<ConferenceDto>> Handle(GetConferencePageQuery request, CancellationToken cancellationToken)
        {
            var source = CurrentUser.IsGlobalAdmin
                ? Context.Conferences
                    .OrderByDescending(conf => conf.EndDate)
                : Context.Conferences
                    .Where(conf => conf.Participants.Select(user => user.Id).Contains(CurrentUser.Id))
                    .OrderByDescending(conf => conf.EndDate);

            var conferences = await PaginatedList<Conference>.CreateAsync(source, request.PageIndex, request.PageSize);

            var dtos = conferences.Select(Mapper.Map<ConferenceDto>);

            return new GetEntityPageResponse<ConferenceDto>()
            {
                Items = dtos,
                TotalCount = conferences.TotalCount,
                TotalPages = conferences.TotalPages
            };
        }
    }
}
