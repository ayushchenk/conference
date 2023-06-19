using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Domain.Enums;

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

            if (CurrentUser.IsReviewerIn(submission!.Conference))
            {
                return Context.Papers
                .Where(p => p.SubmissionId == submission.Id)
                .Where(p => submission.Conference.IsAnonymizedFileRequired ? p.Type == PaperType.Anonymized : true)
                .OrderByDescending(p => p.CreatedOn)
                .Select(Mapper.Map<Paper, PaperDto>);
            }

            var papers = Context.Papers
                .Where(p => p.SubmissionId == request.SubmissionId)
                .OrderByDescending(p => p.CreatedOn)
                .Select(Mapper.Map<Paper, PaperDto>);

            return papers;
        }
    }
}
