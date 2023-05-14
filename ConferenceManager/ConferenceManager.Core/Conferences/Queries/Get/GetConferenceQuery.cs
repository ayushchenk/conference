using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.Queries.Get
{
    public class GetConferenceQuery : GetEntityQuery<ConferenceDto?>
    {
        public GetConferenceQuery(int id) : base(id)
        {
        }
    }
}
