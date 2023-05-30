using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.User.GetSubmissions
{
    public class GetUserSubmissionsQuery : GetEntitiesQuery<SubmissionDto>
    {
        public int UserId { get; }

        public GetUserSubmissionsQuery(int userId)
        {
            UserId = userId;
        }
    }
}
