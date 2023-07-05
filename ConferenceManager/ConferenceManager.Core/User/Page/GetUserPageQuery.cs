using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.User.Page
{
    public class GetUserPageQuery : GetEntityPageQuery<UserDto>
    {
        public string? Query { get; }

        public GetUserPageQuery(int pageIndex, int pageSize, string? query = null) : base(pageIndex, pageSize)
        {
            Query = query;
        }
    }
}
