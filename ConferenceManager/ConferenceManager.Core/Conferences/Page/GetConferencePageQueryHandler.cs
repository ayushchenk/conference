using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Page
{
    public class GetConferencePageQueryHandler : DbContextRequestHandler<GetConferencePageQuery, EntityPageResponse<ConferenceDto>>
    {
        public GetConferencePageQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<ConferenceDto>> Handle(GetConferencePageQuery request, CancellationToken cancellationToken)
        {
            var source = Context.Conferences.OrderByDescending(conf => conf.EndDate);

            var conferences = await PaginatedList<Conference>.CreateAsync(source, request.PageIndex, request.PageSize);

            var dtos = conferences.Select(Mapper.Map<Conference, ConferenceDto>);

            return new EntityPageResponse<ConferenceDto>()
            {
                Items = dtos,
                TotalCount = conferences.TotalCount,
                TotalPages = conferences.TotalPages
            };
        }
    }
}
