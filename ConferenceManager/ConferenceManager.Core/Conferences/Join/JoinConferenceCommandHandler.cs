using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Conferences.AddParticipant;
using ConferenceManager.Core.User.AddRole;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.Join
{
    public class JoinConferenceCommandHandler : DbContextRequestHandler<JoinConferenceCommand>
    {
        private readonly IMediator _mediator;

        public JoinConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            IMediator mediator) : base(context, currentUser, mapper)
        {
            _mediator = mediator;
        }

        public override async Task Handle(JoinConferenceCommand request, CancellationToken cancellationToken)
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
        }
    }
}
