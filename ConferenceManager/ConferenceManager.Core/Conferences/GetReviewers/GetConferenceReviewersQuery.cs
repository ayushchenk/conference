using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.GetReviewers
{
    public class GetConferenceReviewersQuery : GetEntitiesQuery<UserDto>
    {
        public int ConferenceId { get; }

        public int SubmissionId { get; }

        public GetConferenceReviewersQuery(int conferenceId, int submissionId)
        {
            ConferenceId = conferenceId;
            SubmissionId = submissionId;
        }
    }
}
