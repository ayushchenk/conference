using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UpdateComment
{
    public class UpdateCommentCommandHandler : DbContextRequestHandler<UpdateCommentCommand>
    {
        public UpdateCommentCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(UpdateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = Mapper.Map<UpdateCommentCommand, Comment>(request);

            Context.Comments.Update(comment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
