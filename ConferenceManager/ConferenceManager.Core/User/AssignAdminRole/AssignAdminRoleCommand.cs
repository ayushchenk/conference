using MediatR;

namespace ConferenceManager.Core.User.AssignAdminRole
{
    public class AssignAdminRoleCommand : IRequest
    {
        public int Id { get; }

        public AssignAdminRoleCommand(int id)
        {
            Id = id;
        }
    }
}
