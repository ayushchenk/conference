using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Papers
{
    public class GetSubmissionPapersQueryHandler : DbContextRequestHandler<GetSubmissionPapersQuery, EntityPageResponse<PaperDto>>
    {
        public GetSubmissionPapersQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<PaperDto>> Handle(GetSubmissionPapersQuery request, CancellationToken cancellationToken)
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

            var papers = Context.Papers
                    .Where(p => p.SubmissionId == submission.Id)
                    .OrderByDescending(p => p.CreatedOn);

            var page = await PaginatedList<Paper>.CreateAsync(papers, request.PageIndex, request.PageSize);

            return new EntityPageResponse<PaperDto>()
            {
                Items = page.Select(Mapper.Map<Paper, PaperDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages
            };
        }
    }
}
