using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Conferences.Common;

namespace ConferenceManager.Core.Conferences.Get
{
    public class GetConferenceQuery : GetEntityQuery<ConferenceDto?>
    {
        public GetConferenceQuery(int id) : base(id)
        {
        }
    }
}
