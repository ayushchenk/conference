using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Conferences.RemoveParticipant;

namespace ConferenceManager.Core.Conferences.AddParticipant
{
    public class RemoveParticipantCommandHandler : DbContextRequestHandler<RemoveParticipantCommand, EmptyResponse>
    {
        public RemoveParticipantCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EmptyResponse> Handle(RemoveParticipantCommand request, CancellationToken cancellationToken)
        {
            var participation = Context.ConferenceParticipants
                .FirstOrDefault(p => p.ConferenceId == request.ConferenceId && p.UserId == request.UserId);

            if (participation == null)
            {
                throw new NotFoundException();
            }

            CheckConferenceAdminPermission(request.ConferenceId);

            Context.ConferenceParticipants.Remove(participation);

            await Context.SaveChangesAsync(cancellationToken);

            return EmptyResponse.Value;
        }

        private void CheckConferenceAdminPermission(int conferenceId)
        {
            if (CurrentUser.IsConferenceAdmin)
            {
                var isAdminInConference = Context.ConferenceParticipants
                    .Where(p => p.ConferenceId == conferenceId)
                    .Select(p => p.UserId)
                    .Contains(CurrentUser.Id);

                if (!isAdminInConference)
                {
                    throw new ForbiddenException("Can only remove user from participating conference");
                }
            }
        }
    }
}
