using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
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

            if (submission == null)
            {
                throw new NotFoundException();
            }

            var reviewers = Context.SubmissionReviewers
                .Where(sr => sr.SubmissionId == submission.Id)
                .Select(sr => sr.ReviewerId);

            var confParticipants = Context.ConferenceParticipants
                .Where(conf => conf.ConferenceId == submission.ConferenceId)
                .Select(conf => conf.UserId);

            var isParticipant = confParticipants.Contains(CurrentUser.Id);
            var isReviewer = reviewers.Contains(CurrentUser.Id);

            if (CurrentUser.IsGlobalAdmin
                || (CurrentUser.IsConferenceAdmin && isParticipant)
                || (CurrentUser.IsReviewer && isReviewer)
                || submission.CreatedById == CurrentUser.Id)
            {
                return Mapper.Map<Submission, SubmissionDto>(submission);
            }

            throw new ForbiddenException();
        }
    }
}
