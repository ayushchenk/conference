using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Common
{
    public class CommentMapper : IMapper<Comment, CommentDto>
    {
        public CommentDto Map(Comment source)
        {
            return new CommentDto()
            {
                Id = source.Id,
                SubmissionId = source.SubmissionId,
                AuthorId = source.CreatedById,
                AuthorName = source.CreatedBy.FullName,
                AuthorEmail = source.CreatedBy.Email!,
                Text = source.Text
            };
        }
    }
}
