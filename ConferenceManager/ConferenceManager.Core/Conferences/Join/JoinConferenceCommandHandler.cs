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

            await _mediator.Send(new AddParticipantCommand(code!.ConferenceId, CurrentUser.Id), cancellationToken);
            await _mediator.Send(new AssignRoleCommand()
            {
                Id = CurrentUser.Id,
                ConferenceId = code.ConferenceId,
                Role = code.Role
            });
        }

        //private async Task AddParticipantIfNotExists(InviteCode code, CancellationToken cancellationToken)
        //{
        //    var participation = await Context.ConferenceParticipants
        //        .FindAsync(new object[] { CurrentUser.Id, code.ConferenceId }, cancellationToken);

        //    if (participation != null)
        //    {
        //        return;
        //    }

        //    participation = new 
        //}

        //private async Task AddRoleAssignmentIfNotExists(InviteCode code, CancellationToken cancellationToken)
        //{

        //}
    }
}
