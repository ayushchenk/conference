using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.Queries.Page
{
    public class GetConferencePageQuery : GetEntityPageQuery<ConferenceDto>
    {
        public GetConferencePageQuery(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
    }
}
