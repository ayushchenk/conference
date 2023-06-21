using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Core.Conferences.AddParticipant;
using ConferenceManager.Core.User.AddRole;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.Join
{
    public class JoinConferenceCommandHandler : DbContextRequestHandler<JoinConferenceCommand, TokenResponse>
    {
        private readonly IMediator _mediator;
        private readonly IIdentityService _identityService;

        public JoinConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            IMediator mediator,
            IIdentityService identityService) : base(context, currentUser, mapper)
        {
            _mediator = mediator;
            _identityService = identityService;
        }

        public override async Task<TokenResponse> Handle(JoinConferenceCommand request, CancellationToken cancellationToken)
        {
            var code = await Context.InviteCodes
                .FirstOrDefaultAsync(c => c.Code == request.Code, cancellationToken);

            var userId = request.UserId == default ? CurrentUser.Id : request.UserId;

            await _mediator.Send(new AddParticipantCommand(code!.ConferenceId, userId), cancellationToken);
            await _mediator.Send(new AssignRoleCommand()
            {
                Id = userId,
                ConferenceId = code.ConferenceId,
                Role = code.Role
            });

            var user = await Context.Users.FindAsync(userId, cancellationToken);

            return _identityService.GenerateToken(user!);
        }
    }
}
