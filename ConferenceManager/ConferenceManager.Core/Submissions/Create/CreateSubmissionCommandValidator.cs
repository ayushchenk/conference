using FluentValidation;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandValidator : AbstractValidator<CreateSubmissionCommand>
    {
        public CreateSubmissionCommandValidator()
        {
            RuleFor(x => x.ConferenceId)
                .GreaterThan(0).WithMessage("ConferenceId is required");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Maximum length for Title is 100");

            RuleFor(x => x.Keywords)
                .NotEmpty().WithMessage("Keywords are required")
                .MaximumLength(100).WithMessage("Maximum length for Keywords is 100");

            RuleFor(x => x.Abstract)
                .NotEmpty().WithMessage("Abstract are required")
                .MaximumLength(1000).WithMessage("Maximum length for Abstract is 1000");

            RuleFor(x => x.File)
                .NotEmpty().WithMessage("File is required");
        }
    }
}
