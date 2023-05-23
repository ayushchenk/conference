using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Conferences.AddParticipant
{
    public class AddParticipantCommand : IRequest<EmptyResponse>
    {
        public int ConferenceId { get; }

        public int UserId { get; }

        public AddParticipantCommand(int conferenceId, int userId)
        {
            ConferenceId = conferenceId;
            UserId = userId;
        }
    }
}
