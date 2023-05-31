using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.GetPreferences
{
    public class GetReviewPreferencesQueryHandler : DbContextRequestHandler<GetReviewPreferencesQuery, IEnumerable<UserDto>>
    {
        public GetReviewPreferencesQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<UserDto>> Handle(GetReviewPreferencesQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            return submission!.AppliedReviewers
                .OrderBy(x => x.Id)
                .Select(Mapper.Map<ApplicationUser, UserDto>);
        }
    }
}
