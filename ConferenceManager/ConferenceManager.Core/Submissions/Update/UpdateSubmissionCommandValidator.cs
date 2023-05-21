using ConferenceManager.Core.Submissions.Update;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.Create
{
    public class UpdateSubmissionCommandValidator : AbstractValidator<UpdateSubmissionCommand>
    {
        public UpdateSubmissionCommandValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Id is required");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Maximum length for Title is 100");

            RuleFor(x => x.Keywords)
                .NotEmpty().WithMessage("Keywords are required")
                .MaximumLength(100).WithMessage("Maximum length for Keywords is 100");

            RuleFor(x => x.Abstract)
                .NotEmpty().WithMessage("Abstract is required")
                .MaximumLength(1000).WithMessage("Maximum length for Abstract is 1000");
        }
    }
}
