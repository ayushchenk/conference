using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Submissions.GetComments
{
    public class GetCommentsQuery : GetEntitiesQuery<CommentDto>
    {
        public int SubmissionId { get; }

        public GetCommentsQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
