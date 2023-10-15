using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Conferences.GetSubmissions
{
    public class GetConferenceSubmissionsQueryValidator : BaseValidator<GetConferenceSubmissionsQuery>
    {
        public GetConferenceSubmissionsQueryValidator()
        {
            Include(new EntityPageQueryValidator<SubmissionDto>());
        }
    }
}
