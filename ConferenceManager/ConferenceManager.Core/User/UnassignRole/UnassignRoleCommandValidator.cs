using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.User.AssignRole
{
    public class UnassignRoleCommandValidator : Validator<UnassignRoleCommand>
    {
        public UnassignRoleCommandValidator() 
        {
            RuleForId(x => x.Id);
            RuleForArray(x => x.Role, ApplicationRole.SupportedRoles);
        }
    }
}
