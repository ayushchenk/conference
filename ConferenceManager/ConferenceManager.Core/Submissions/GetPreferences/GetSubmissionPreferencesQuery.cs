using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Submissions.GetPreferences
{
    public class GetSubmissionPreferencesQuery : GetEntitiesQuery<UserDto>
    {
        public int SubmissionId { get; }

        public GetSubmissionPreferencesQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
