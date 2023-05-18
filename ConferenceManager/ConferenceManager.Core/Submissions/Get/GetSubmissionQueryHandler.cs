using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Get
{
    public class GetSubmissionQueryHandler : DbContextRequestHandler<GetSubmissionQuery, SubmissionDto?>
    {
        private readonly IMapper<Submission, SubmissionDto> _mapper;

        public GetSubmissionQueryHandler(
            IMapper<Submission, SubmissionDto> mapper,
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            _mapper = mapper;
        }

        public override async Task<SubmissionDto?> Handle(GetSubmissionQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.Id, cancellationToken);

            if (submission == null)
            {
                return null;
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
                || (CurrentUser.Roles.Contains(ApplicationRole.ConferenceAdmin) && isParticipant)
                || (CurrentUser.Roles.Contains(ApplicationRole.Reviwer) && isReviewer)
                || submission.CreatedById == CurrentUser.Id)
            {
                return _mapper.Map(submission);
            }

            throw new ForbiddenException();
        }
    }
}
