using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Conferences.RemoveParticipant
{
    public class RemoveParticipantCommand : IRequest<EmptyResponse>
    {
        public int ConferenceId { get; }

        public int UserId { get; }

        public RemoveParticipantCommand(int conferenceId, int userId)
        {
            ConferenceId = conferenceId;
            UserId = userId;
        }
    }
}
