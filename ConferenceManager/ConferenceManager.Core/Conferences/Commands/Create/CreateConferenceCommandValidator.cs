using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommandValidator : AbstractValidator<CreateConferenceCommand>
    {
        public CreateConferenceCommandValidator()
        {
            RuleFor(x => x.Entity)
                .NotNull()
                .SetValidator(new ConferenceDtoValidator());

            RuleFor(x => x.Entity.Id)
                .Empty().WithMessage("Id should be empty");
        }
    }
}
