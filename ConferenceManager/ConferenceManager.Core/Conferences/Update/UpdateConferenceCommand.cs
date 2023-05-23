using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Core.Conferences.Model;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommand : ConferenceCommandBase, IUpdateEntityCommand
    {
        [JsonIgnore]
        public int Id { set; get; }
    }
}
