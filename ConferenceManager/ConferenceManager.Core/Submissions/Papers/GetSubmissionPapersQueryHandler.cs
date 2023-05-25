using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Papers
{
    public class GetSubmissionPapersQueryHandler : DbContextRequestHandler<GetSubmissionPapersQuery, IEnumerable<PaperDto>>
    {
        public GetSubmissionPapersQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<PaperDto>> Handle(GetSubmissionPapersQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            if (submission == null)
            {
                throw new NotFoundException("Submission not found");
            }

            if ((CurrentUser.HasAuthorRole && !CurrentUser.IsAuthorOf(submission))
                || !CurrentUser.IsReviewerOf(submission))
            {
                throw new ForbiddenException("Must be author or reviewer");
            }

            return Context.Papers
                    .Where(p => p.SubmissionId == submission.Id)
                    .OrderByDescending(p => p.CreatedOn)
                    .Select(Mapper.Map<Paper, PaperDto>);
        }
    }
}
