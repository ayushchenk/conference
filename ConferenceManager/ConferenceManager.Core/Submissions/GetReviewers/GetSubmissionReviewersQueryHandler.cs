using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.GetReviewers
{
    public class GetSubmissionReviewersQueryHandler : DbContextRequestHandler<GetSubmissionReviewersQuery, IEnumerable<UserDto>>
    {
        public GetSubmissionReviewersQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<UserDto>> Handle(GetSubmissionReviewersQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            if (submission == null)
            {
                throw new NotFoundException("Submission not found");
            }

            if(!CurrentUser.IsParticipantOf(submission.Conference))
            {
                throw new ForbiddenException("User is not part of conference");
            }

            return submission
                .ActualReviewers
                .Select(Mapper.Map<ApplicationUser, UserDto>);
        }
    }
}
