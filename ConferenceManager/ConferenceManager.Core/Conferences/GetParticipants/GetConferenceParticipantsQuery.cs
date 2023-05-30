using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.GetParticipants
{
    public class GetConferenceParticipantsQuery : GetEntityPageQuery<UserDto>
    {
        public int ConferenceId { get; }

        public GetConferenceParticipantsQuery(
            int conferenceId, int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
            ConferenceId = conferenceId;
        }
    }
}
