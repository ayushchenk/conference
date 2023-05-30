using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using FluentValidation;

namespace ConferenceManager.Core.User.AssignRole
{
    public class UnassignRoleCommandValidator : AbstractValidator<UnassignRoleCommand>
    {
        public UnassignRoleCommandValidator() 
        {
            RuleFor(x => x.Role)
                .Must(role => ApplicationRole.SupportedRoles.Contains(role))
                .WithMessage(x => $"Role {x.Role} does not exist");
        }
    }
}
