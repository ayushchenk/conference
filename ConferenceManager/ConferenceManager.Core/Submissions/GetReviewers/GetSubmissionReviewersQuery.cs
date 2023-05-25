using ConferenceManager.Core.Account.Common;
using MediatR;

namespace ConferenceManager.Core.Submissions.GetReviewers
{
    public class GetSubmissionReviewersQuery : IRequest<IEnumerable<UserDto>>
    {
        public int SubmissionId { get; }

        public GetSubmissionReviewersQuery(int id) 
        {
            SubmissionId = id;
        }
    }
}
