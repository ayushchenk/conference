using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Domain.Enums;

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
            dto.IsValidForReview = dto.IsValidForReview && CanReview(submission!);

            return dto;
        }

        private bool CanReview(Submission submission)
        {
            if (submission.Status != SubmissionStatus.AcceptedWithSuggestions)
            {
                return !submission.Reviews.Any(r => r.CreatedById == CurrentUser.Id);
            }

            return submission.Reviews
                .Select(r => r.CreatedById)
                .Count(id => id == CurrentUser.Id) < 2;
        }
    }
}
