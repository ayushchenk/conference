using ConferenceManager.Core.Common.Commands;

namespace ConferenceManager.Core.Conferences.Commands.Delete
{
    public class DeleteConferenceCommand : DeleteEntityCommand
    {
        public DeleteConferenceCommand(int id) : base(id)
        {
        }
    }
}
