using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.GetComments
{
    public class GetCommentsQueryHandler : DbContextRequestHandler<GetCommentsQuery, IEnumerable<CommentDto>>
    {
        public GetCommentsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser, IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override Task<IEnumerable<CommentDto>> Handle(GetCommentsQuery request, CancellationToken cancellationToken)
        {
            var comments = Context.Comments
                .Where(c => c.SubmissionId == request.SubmissionId)
                .OrderByDescending(c => c.CreatedOn);

            var dtos = comments.Select(Mapper.Map<Comment, CommentDto>);

            return Task.FromResult(dtos);
        }
    }
}
