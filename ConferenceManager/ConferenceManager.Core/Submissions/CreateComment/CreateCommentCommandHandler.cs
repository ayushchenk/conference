using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.CreateComment
{
    public class CreateCommentCommandHandler : DbContextRequestHandler<CreateCommentCommand, CreateEntityResponse>
    {
        public CreateCommentCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<CreateEntityResponse> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
        {
            var comment = Mapper.Map<CreateCommentCommand, Comment>(request);

            Context.Comments.Add(comment);
            await Context.SaveChangesAsync(cancellationToken);

            return new CreateEntityResponse(comment.Id);
        }
    }
}
