using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Validators;

namespace ConferenceManager.Core.Conferences.GetParticipants
{
    public class GetConferenceParticipantsQueryValidator : Validator<GetConferenceParticipantsQuery>
    {
        public GetConferenceParticipantsQueryValidator()
        {
            Include(new EntityPageQueryValidator<UserDto>());
        }
    }
}
