using ConferenceManager.Core.Submissions.Common;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Submissions.UpdateComment
{
    public class UpdateCommentCommand : IRequest<CommentDto>
    {
        public int Id { set; get; }

        [Required]
        [MaxLength(1000)]
        public string Text { set; get; } = null!;
    }
}
