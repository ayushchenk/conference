using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Get
{
    public class GetSubmissionQueryHandler : DbContextRequestHandler<GetSubmissionQuery, SubmissionDto?>
    {
        public GetSubmissionQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<SubmissionDto?> Handle(GetSubmissionQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.Id, cancellationToken);

            var dto = Mapper.Map<Submission, SubmissionDto>(submission!);
            dto.IsReviewer = CurrentUser.IsReviewerOf(submission!);

            return dto;
        }
    }
}
