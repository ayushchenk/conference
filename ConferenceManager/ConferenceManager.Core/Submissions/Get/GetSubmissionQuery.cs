using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Submissions.Get
{
    public class GetSubmissionQuery : GetEntityQuery<SubmissionDto?>
    {
        public GetSubmissionQuery(int id) : base(id)
        {
        }
    }
}
