using ConferenceManager.Core.Common.Commands;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.CreateComment
{
    public class CreateCommentCommand : ICreateEntityCommand
    {
        [JsonIgnore]
        public int SubmissionId { set; get; }

        [Required]
        [MaxLength(1000)]
        public string Text { set; get; } = null!;
    }
}
