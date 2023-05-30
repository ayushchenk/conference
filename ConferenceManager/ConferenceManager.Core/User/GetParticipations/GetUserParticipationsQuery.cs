using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Conferences.Common;

namespace ConferenceManager.Core.User.GetParticipations
{
    public class GetUserParticipationsQuery : GetEntitiesQuery<ConferenceDto>
    {
        public int UserId { get; }

        public GetUserParticipationsQuery(int userId)
        {
            UserId = userId;
        }
    }
}
