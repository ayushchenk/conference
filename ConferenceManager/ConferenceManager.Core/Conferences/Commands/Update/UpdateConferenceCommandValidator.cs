using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Conferences.Commands.Update;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class UpdateConferenceCommandValidator : AbstractValidator<UpdateConferenceCommand>
    {
        public UpdateConferenceCommandValidator()
        {
            RuleFor(x => x.Entity)
                .NotNull()
                .SetValidator(new ConferenceDtoValidator());

            RuleFor(x => x.Entity.Id)
                .NotEmpty().WithMessage("Id should not be empty");
        }
    }
}
