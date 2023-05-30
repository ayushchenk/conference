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

        public override Task<IEnumerable<PaperDto>> Handle(GetSubmissionPapersQuery request, CancellationToken cancellationToken)
        {
            var papers = Context.Papers
                    .Where(p => p.SubmissionId == request.SubmissionId)
                    .OrderByDescending(p => p.CreatedOn)
                    .Select(Mapper.Map<Paper, PaperDto>);

            return Task.FromResult(papers);
        }
    }
}
