using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.CreateComment
{
    public class CreateCommentCommandHandler : DbContextRequestHandler<CreateCommentCommand, CommentDto>
    {
        public CreateCommentCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<CommentDto> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = Mapper.Map<CreateCommentCommand, Comment>(request);

            Context.Comments.Add(comment);
            await Context.SaveChangesAsync(cancellationToken);

            var queried = await Context.Comments
                .AsNoTracking()
                .Include(c => c.CreatedBy)
                .Include(c => c.Submission)
                .FirstAsync(c => c.Id == comment.Id);

            return Mapper.Map<Comment, CommentDto>(queried);
        }
    }
}
