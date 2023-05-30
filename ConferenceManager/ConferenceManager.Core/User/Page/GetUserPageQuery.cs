using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.User.Page
{
    public class GetUserPageQuery : GetEntityPageQuery<UserDto>
    {
        public GetUserPageQuery(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
    }
}
