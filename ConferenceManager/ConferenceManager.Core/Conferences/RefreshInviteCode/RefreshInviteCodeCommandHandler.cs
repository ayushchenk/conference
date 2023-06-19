using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Util;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.RefreshInviteCode
{
    public class RefreshInviteCodeCommandHandler : DbContextRequestHandler<RefreshInviteCodeCommand, InviteCodeDto>
    {
        public RefreshInviteCodeCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<InviteCodeDto> Handle(RefreshInviteCodeCommand request, CancellationToken cancellationToken)
        {
            var code = await Context.InviteCodes
                .FirstOrDefaultAsync(c => c.Code == request.Code, cancellationToken);

            code!.Code = Password.Generate(15, 0);

            Context.InviteCodes.Update(code);
            await Context.SaveChangesAsync(cancellationToken);

            return Mapper.Map<InviteCode, InviteCodeDto>(code);
        }
    }
}
