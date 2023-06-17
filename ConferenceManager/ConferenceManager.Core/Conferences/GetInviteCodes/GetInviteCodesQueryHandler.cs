using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetInviteCodes
{
    public class GetInviteCodesQueryHandler : DbContextRequestHandler<GetInviteCodesQuery, IEnumerable<InviteCode>>
    {
        public GetInviteCodesQueryHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<InviteCode>> Handle(GetInviteCodesQuery request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.ConferenceId, cancellationToken);

            return Mapper.Map<Conference, IEnumerable<InviteCode>>(conference!);
        }
    }
}
