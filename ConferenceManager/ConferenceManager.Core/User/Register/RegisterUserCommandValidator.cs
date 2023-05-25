using FluentValidation;

namespace ConferenceManager.Core.User.Register
{
    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email should be of valid format")
                .MaximumLength(100).WithMessage("Maximum length for Email is 100");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required")
                .MaximumLength(50).WithMessage("Maximum length for Password is 50"); ;

            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Firstname is required")
                .MaximumLength(50).WithMessage("Maximum length for Firstname is 50");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Lastname is required")
                .MaximumLength(50).WithMessage("Maximum length for Lastname is 50"); ;

            RuleFor(x => x.Country)
                .NotEmpty().WithMessage("Country is required")
                .MaximumLength(50).WithMessage("Maximum length for Country is 50"); ;

            RuleFor(x => x.Affiliation)
                .NotEmpty().WithMessage("Affiliation is required")
                .MaximumLength(100).WithMessage("Maximum length for Affiliation is 100");

            RuleFor(x => x.Webpage)
                .MaximumLength(100).WithMessage("Maximum length for Webpage is 100");
        }
    }
}
