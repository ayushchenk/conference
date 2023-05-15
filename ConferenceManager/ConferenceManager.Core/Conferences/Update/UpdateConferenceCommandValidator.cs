using ConferenceManager.Core.Conferences.Common;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandValidator : AbstractValidator<UpdateConferenceCommand>
    {
        public UpdateConferenceCommandValidator()
        {
            Include(new ConferenceCommandBaseValidator());

            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Id is required");
        }
    }
}
