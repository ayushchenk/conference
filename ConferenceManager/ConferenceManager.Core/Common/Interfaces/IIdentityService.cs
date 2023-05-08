using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.Common.Interfaces;

public interface IIdentityService
{
    Task<ApplicationUser?> Get(int userId);

    Task<bool> IsInRole(int userId, string role);

    Task<bool> Authorize(int userId, string policyName);

    Task<(IdentityResult Result, int UserId)> Create(ApplicationUser user, string password);

    Task<IdentityResult> Delete(int userId);
}
