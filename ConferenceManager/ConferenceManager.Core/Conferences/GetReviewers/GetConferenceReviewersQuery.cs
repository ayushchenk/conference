using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.GetReviewers
{
    public class GetConferenceReviewersQuery : GetEntitiesQuery<UserDto>
    {
        public int ConferenceId { get; }

        public GetConferenceReviewersQuery(int conferenceId)
        {
            ConferenceId = conferenceId;
        }
    }
}
