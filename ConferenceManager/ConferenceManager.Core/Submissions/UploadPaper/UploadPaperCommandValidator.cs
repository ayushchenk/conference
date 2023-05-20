using ConferenceManager.Core.Submissions.UpdatePaper;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.UploadPaper
{
    public class UploadPaperCommandValidator : AbstractValidator<UploadPaperCommand>
    {
        public UploadPaperCommandValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Submission Id is required");

            RuleFor(x => x.File)
                .NotEmpty().WithMessage("File is required");
        }
    }
}
