using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Infrastructure.Services;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly IAuthorizationService _authorizationService;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        IAuthorizationService authorizationService)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _authorizationService = authorizationService;
    }

    public async Task<ApplicationUser?> Get(int userId)
    {
        return await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
    }

    public async Task<(IdentityResult Result, int UserId)> Create(ApplicationUser user, string password)
    {
        var result = await _userManager.CreateAsync(user, password);

        return (result, user.Id);
    }

    public async Task<bool> IsInRole(int userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> Authorize(int userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<IdentityResult> Delete(int userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null
            ? await Delete(user)
            : IdentityResult.Failed(new IdentityError() { Description = "User not found" });
    }

    public async Task<IdentityResult> Delete(ApplicationUser user)
    {
        return await _userManager.DeleteAsync(user);
    }
}
