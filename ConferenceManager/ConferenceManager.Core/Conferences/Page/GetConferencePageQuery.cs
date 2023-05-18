using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Conferences.Common;

namespace ConferenceManager.Core.Conferences.Page
{
    public class GetConferencePageQuery : GetEntityPageQuery<ConferenceDto>
    {
        public GetConferencePageQuery(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
    }
}
