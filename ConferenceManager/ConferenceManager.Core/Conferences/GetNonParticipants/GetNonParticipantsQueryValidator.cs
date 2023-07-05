using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.GetNonParticipants
{
    public class GetNonParticipantsQueryValidator : AbstractValidator<GetNonParticipantsQuery>
    {
        public GetNonParticipantsQueryValidator()
        {
            Include(new EntityPageQueryValidator<UserDto>());
            RuleFor(x => x.Query).MaximumLength(100);
        }
    }
}
