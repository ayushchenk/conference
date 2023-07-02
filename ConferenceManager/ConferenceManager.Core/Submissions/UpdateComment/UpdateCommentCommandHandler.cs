using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.UpdateComment
{
    public class UpdateCommentCommandHandler : DbContextRequestHandler<UpdateCommentCommand, CommentDto>
    {
        public UpdateCommentCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<CommentDto> Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = Mapper.Map<UpdateCommentCommand, Comment>(request);

            Context.Comments.Update(comment);
            await Context.SaveChangesAsync(cancellationToken);

            var updated = await Context.Comments
                .AsNoTracking()
                .Include(c => c.CreatedBy)
                .Include(c => c.Submission)
                .FirstAsync(c => c.Id == comment.Id);

            return Mapper.Map<Comment, CommentDto>(updated);
        }
    }
}
