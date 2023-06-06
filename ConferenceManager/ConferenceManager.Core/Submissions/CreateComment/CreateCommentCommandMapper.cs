using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.CreateComment
{
    public class CreateCommentCommandMapper : IMapper<CreateCommentCommand, Comment>
    {
        public Comment Map(CreateCommentCommand source)
        {
            return new Comment()
            {
                SubmissionId = source.SubmissionId,
                Text = source.Text
            };
        }
    }
}
