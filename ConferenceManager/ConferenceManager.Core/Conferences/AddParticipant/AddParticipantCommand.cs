using MediatR;

namespace ConferenceManager.Core.Conferences.AddParticipant
{
    public class AddParticipantCommand : IRequest
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
