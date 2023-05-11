using FluentValidation;

namespace ConferenceManager.Core.Account.Commands.Register
{
    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator() 
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email should be of valid format");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required");

            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("Firstname is required");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Lastname is required");

            RuleFor(x => x.Country)
                .NotEmpty().WithMessage("Country is required");

            RuleFor(x => x.Affiliation)
                .NotEmpty().WithMessage("Affiliation is required");
        }
    }
}
