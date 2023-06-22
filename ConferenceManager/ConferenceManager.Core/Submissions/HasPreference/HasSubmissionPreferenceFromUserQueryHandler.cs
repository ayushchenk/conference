using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;

namespace ConferenceManager.Core.Submissions.HasPreference
{
    public class HasSubmissionPreferenceFromUserQueryHandler : DbContextRequestHandler<HasSubmissionPreferenceFromUserQuery, BoolResponse>
    {
        public HasSubmissionPreferenceFromUserQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<BoolResponse> Handle(HasSubmissionPreferenceFromUserQuery request, CancellationToken cancellationToken)
        {
            var preference = await Context.ReviewPreferences
                .FindAsync(new object[] { request.SubmissionId, CurrentUser.Id }, cancellationToken);

            return new BoolResponse(preference != null);
        }
    }
}
