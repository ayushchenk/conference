using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Submissions.Papers
{
    public class GetSubmissionPapersQuery : GetEntitiesQuery<PaperDto>
    {
        public int SubmissionId { get; }

        public GetSubmissionPapersQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
