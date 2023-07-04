using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Conferences.GetSubmissions
{
    public class GetConferenceSubmissionsQuery : GetEntityPageQuery<SubmissionDto>
    {
        public int ConferenceId { get; }

        public string? Query { get; }

        public GetConferenceSubmissionsQuery(
            int conferenceId, string? query, int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
            ConferenceId = conferenceId;
            Query = query;
        }
    }
}
