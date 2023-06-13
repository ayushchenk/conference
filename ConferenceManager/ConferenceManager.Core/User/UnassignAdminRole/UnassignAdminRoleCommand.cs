using MediatR;

namespace ConferenceManager.Core.User.UnassignAdminRole
{
    public class UnassignAdminRoleCommand : IRequest
    {
        public int Id { get; }

        public UnassignAdminRoleCommand(int id)
        {
            Id = id;
        }
    }
}
