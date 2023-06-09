using ConferenceManager.Core.Common.Commands;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Submissions.UpdateComment
{
    public class UpdateCommentCommand : IUpdateEntityCommand
    {
        public int Id { set; get; }

        [Required]
        [MaxLength(1000)]
        public string Text { set; get; } = null!;
    }
}
