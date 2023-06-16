using MediatR;

namespace ConferenceManager.Core.User.IsParticipant
{
    public class IsParticipantQuery : IRequest<bool>
    {
        public int UserId { get; }

        public int ConferenceId { get; }

        public IsParticipantQuery(int userId, int conferenceId)
        {
            UserId = userId;
            ConferenceId = conferenceId;
        }
    }
}
