using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Submissions.DeleteComment
{
    public class DeleteCommentCommandHandler : DbContextRequestHandler<DeleteCommentCommand>
    {
        public DeleteCommentCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(DeleteCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = await Context.Comments.FindAsync(request.Id, cancellationToken);

            Context.Comments.Remove(comment!);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
