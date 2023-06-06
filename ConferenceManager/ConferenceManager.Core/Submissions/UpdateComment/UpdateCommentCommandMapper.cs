using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UpdateComment
{
    public class UpdateCommentCommandMapper : IMapper<UpdateCommentCommand, Comment>
    {
        public Comment Map(UpdateCommentCommand source)
        {
            return new Comment()
            {
                Id = source.Id,
                Text = source.Text,
                SubmissionId = 0
            };
        }
    }
}
