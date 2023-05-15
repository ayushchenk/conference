using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Core.Conferences.Model;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommand : ConferenceCommandBase, IUpdateEntityCommand
    {
        public int Id { set; get; }
    }
}
