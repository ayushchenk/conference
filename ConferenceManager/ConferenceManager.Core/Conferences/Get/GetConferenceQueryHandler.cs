using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Get
{
    public class GetConferenceQueryHandler : DbContextRequestHandler<GetConferenceQuery, ConferenceDto?>
    {
        public GetConferenceQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<ConferenceDto?> Handle(GetConferenceQuery request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.Id, cancellationToken);

            return Mapper.Map<Conference, ConferenceDto>(conference!);
        }
    }
}
