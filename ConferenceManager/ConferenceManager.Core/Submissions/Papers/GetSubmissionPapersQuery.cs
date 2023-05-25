using ConferenceManager.Core.Submissions.Common;
using MediatR;

namespace ConferenceManager.Core.Submissions.Papers
{
    public class GetSubmissionPapersQuery : IRequest<IEnumerable<PaperDto>>
    {
        public int SubmissionId { get; }

        public GetSubmissionPapersQuery(int submissionId)
        {
            SubmissionId = submissionId;
        }
    }
}
