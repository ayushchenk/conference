using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.GetPreferences
{
    public class GetSubmissionPreferencesQueryHandler : DbContextRequestHandler<GetSubmissionPreferencesQuery, IEnumerable<UserDto>>
    {
        public GetSubmissionPreferencesQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<UserDto>> Handle(GetSubmissionPreferencesQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            if (submission == null)
            {
                throw new NotFoundException("Submisison not found");
            }

            return submission.AppliedReviewers
                .OrderBy(x => x.Id)
                .Select(Mapper.Map<ApplicationUser, UserDto>);
        }
    }
}
