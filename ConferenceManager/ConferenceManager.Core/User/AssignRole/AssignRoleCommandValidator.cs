using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using FluentValidation;

namespace ConferenceManager.Core.User.AssignRole
{
    public class AssignRoleCommandValidator : Validator<AssignRoleCommand>
    {
        public AssignRoleCommandValidator() 
        {
            RuleForId(x => x.Id);
            RuleForArray(x => x.Role, ApplicationRole.SupportedRoles);
        }
    }
}
