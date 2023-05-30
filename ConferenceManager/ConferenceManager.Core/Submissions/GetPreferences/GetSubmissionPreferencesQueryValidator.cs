using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;

namespace ConferenceManager.Core.Submissions.GetPreferences
{
    public class GetSubmissionPreferencesQueryValidator : DbContextValidator<GetSubmissionPreferencesQuery>
    {
        public GetSubmissionPreferencesQueryValidator(
            IApplicationDbContext context, 
            ICurrentUserService currentUser) : base(context, currentUser)
        {
        }
    }
}
