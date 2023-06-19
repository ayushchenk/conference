using MediatR;

namespace ConferenceManager.Core.User.AssignAdminRole
{
    public class AssignAdminRoleCommand : IRequest
    {
        public int Id { get; }

        public AssignOperation Operation { get; }

        public AssignAdminRoleCommand(int id, AssignOperation operation)
        {
            Id = id;
            Operation = operation;
        }
    }

    public enum AssignOperation
    {
        Assign,
        Unassign
    }
}
