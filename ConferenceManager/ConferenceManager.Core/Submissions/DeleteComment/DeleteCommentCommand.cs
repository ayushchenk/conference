using ConferenceManager.Core.Common.Commands;

namespace ConferenceManager.Core.Submissions.DeleteComment
{
    public class DeleteCommentCommand : DeleteEntityCommand
    {
        public DeleteCommentCommand(int id) : base(id)
        {
        }
    }
}
