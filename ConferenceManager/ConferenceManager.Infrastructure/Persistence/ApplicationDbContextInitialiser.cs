using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Infrastructure.Persistence;

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly AppSettings _appSettings;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;

    public ApplicationDbContextInitialiser(
        ILogger<ApplicationDbContextInitialiser> logger, 
        IOptions<AppSettings> appSettings,
        ApplicationDbContext context, 
        UserManager<ApplicationUser> userManager, 
        RoleManager<ApplicationRole> roleManager
        )
    {
        _logger = logger;
        _appSettings = appSettings.Value;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            await _context.Database.MigrateAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await TrySeedAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    private async Task TrySeedAsync()
    {
        // Default roles
        foreach(var role in ApplicationRole.SupportedRoles)
        {
            if(await _roleManager.FindByNameAsync(role) == null)
            {
                await _roleManager.CreateAsync(new ApplicationRole()
                {
                    Name = role
                });
            }
        }

        // Default users
        var admin = new ApplicationUser ()
        {
            UserName = "admin@localhost.com",
            Email = "admin@localhost.com",
            Affiliation = "affiliation",
            Country = "country",
            FirstName = "Admin",
            LastName = "Localhost"
        };

        if (await _userManager.FindByEmailAsync(admin.Email) == null)
        {
            await _userManager.CreateAsync(admin, _appSettings.SeedSettings.AdminPassword);
            await _userManager.AddToRoleAsync(admin, ApplicationRole.GlobalAdmin );
        }
    }
}
