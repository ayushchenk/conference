using ConferenceManager.Core.Common.Commands;

namespace ConferenceManager.Core.User.Delete
{
    public class DeleteUserCommand : DeleteEntityCommand
    {
        public DeleteUserCommand(int id) : base(id)
        {
        }
    }
}
