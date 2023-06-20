using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetInviteCodes
{
    public class GetInviteCodesQueryHandler : DbContextRequestHandler<GetInviteCodesQuery, IEnumerable<InviteCodeDto>>
    {
        public GetInviteCodesQueryHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override Task<IEnumerable<InviteCodeDto>> Handle(GetInviteCodesQuery request, CancellationToken cancellationToken)
        {
            var codes = Context.InviteCodes.Where(c => c.ConferenceId == request.ConferenceId);

            var dtos = codes.Select(Mapper.Map<InviteCode, InviteCodeDto>);

            return Task.FromResult(dtos);
        }
    }
}
