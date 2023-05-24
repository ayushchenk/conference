using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Submissions.Papers
{
    public class GetSubmissionPapersQuery : GetEntityPageQuery<PaperDto>
    {
        public int SubmissionId { get; }

        public GetSubmissionPapersQuery(int submissionId, int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
            SubmissionId = submissionId;
        }
    }
}
