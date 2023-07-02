using ConferenceManager.Core.Submissions.Common;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.CreateComment
{
    public class CreateCommentCommand : IRequest<CommentDto>
    {
        [JsonIgnore]
        public int SubmissionId { set; get; }

        [Required]
        [MaxLength(1000)]
        public string Text { set; get; } = null!;
    }
}
