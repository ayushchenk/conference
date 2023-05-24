using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.User.Get
{
    public class GetUserQuery : GetEntityQuery<UserDto>
    {
        public GetUserQuery(int id) : base(id)
        {
        }
    }
}
