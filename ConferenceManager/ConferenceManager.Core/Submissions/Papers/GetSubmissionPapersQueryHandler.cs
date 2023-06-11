using ConferenceManager.Core.Common;
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
            if (CurrentUser.HasReviewerRole)
            {
                return await GetPapersForReviewer(request, cancellationToken);
            }

            var papers = Context.Papers
                    .Where(p => p.SubmissionId == request.SubmissionId)
                    .OrderByDescending(p => p.CreatedOn)
                    .Select(Mapper.Map<Paper, PaperDto>);

            return papers;
        }

        private async Task<IEnumerable<PaperDto>> GetPapersForReviewer(GetSubmissionPapersQuery request, CancellationToken cancellationToken)
        {
            var submisison = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            if (submisison!.Conference.IsAnonymizedFileRequired)
            {
                return Context.Papers
                    .Where(p => p.SubmissionId == request.SubmissionId)
                    .Where(p => p.Type == Domain.Enums.PaperType.Anonymized)
                    .OrderByDescending(p => p.CreatedOn)
                    .Select(Mapper.Map<Paper, PaperDto>);
            }

            return Context.Papers
                    .Where(p => p.SubmissionId == request.SubmissionId)
                    .OrderByDescending(p => p.CreatedOn)
                    .Select(Mapper.Map<Paper, PaperDto>);
        }
    }
}
