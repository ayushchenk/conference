using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Util;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.Conferences.Page
{
    public class GetConferencePageQueryHandler : DbContextRequestHandler<GetConferencePageQuery, EntityPageResponse<ConferenceDto>>
    {
        private readonly SeedSettings _settings;

        public GetConferencePageQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            IOptions<SeedSettings> settings) : base(context, currentUser, mapper)
        {
            _settings = settings.Value;
        }

        public override async Task<EntityPageResponse<ConferenceDto>> Handle(GetConferencePageQuery request, CancellationToken cancellationToken)
        {
            var source = Context.Conferences
                .Where(c => c.Title != _settings.AdminConference)
                .OrderByDescending(conf => conf.EndDate);

            var conferences = await PaginatedList<Conference>.CreateAsync(source, request.PageIndex, request.PageSize);

            return new EntityPageResponse<ConferenceDto>()
            {
                Items = conferences.Select(Mapper.Map<Conference, ConferenceDto>),
                TotalCount = conferences.TotalCount,
                TotalPages = conferences.TotalPages
            };
        }
    }
}
