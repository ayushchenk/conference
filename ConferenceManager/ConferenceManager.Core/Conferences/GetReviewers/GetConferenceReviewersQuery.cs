using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.GetReviewers
{
    public class GetConferenceReviewersQuery : GetEntityPageQuery<UserDto>
    {
        public int ConferenceId { get; }

        public GetConferenceReviewersQuery(int conferenceId, int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
            ConferenceId = conferenceId;
        }
    }
}
