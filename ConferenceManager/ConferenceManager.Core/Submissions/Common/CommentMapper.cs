using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Common
{
    public class CommentMapper : IMapper<Comment, CommentDto>
    {
        private readonly ICurrentUserService _currentUser;

        public CommentMapper(ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
        }

        public CommentDto Map(Comment source)
        {
            return new CommentDto()
            {
                Id = source.Id,
                SubmissionId = source.SubmissionId,
                AuthorId = source.CreatedById,
                AuthorName = source.CreatedById == source.Submission.CreatedById 
                    ? "Submission Author" 
                    : source.CreatedBy.FullName,
                Text = source.Text,
                CreatedOn = source.CreatedOn,
                ModifiedOn = source.ModifiedOn,
                IsAuthor = _currentUser.IsAuthorOf(source)
            };
        }
    }
}
