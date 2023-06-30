using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.GetNonParticipants
{
    public class GetNonParticipantsQuery : GetEntityPageQuery<UserDto>
    {
        public int ConferenceId { get; }

        public string Query { get; }

        public GetNonParticipantsQuery(int conferenceId, string query, int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
            ConferenceId = conferenceId;
            Query = query;
        }
    }
}
