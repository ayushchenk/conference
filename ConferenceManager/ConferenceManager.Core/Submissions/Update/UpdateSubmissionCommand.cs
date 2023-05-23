using ConferenceManager.Core.Common.Commands;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.Update
{
    public class UpdateSubmissionCommand : IUpdateEntityCommand
    {
        [JsonIgnore]
        public int Id { set; get; }

        public string Title { set; get; } = null!;

        public string Keywords { set; get; } = null!;

        public string Abstract { set; get; } = null!;
    }
}
