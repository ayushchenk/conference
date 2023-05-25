using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
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

            return submission!
                .ActualReviewers
                .Select(Mapper.Map<ApplicationUser, UserDto>);
        }
    }
}
