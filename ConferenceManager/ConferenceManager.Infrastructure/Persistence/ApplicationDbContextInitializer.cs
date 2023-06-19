using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Infrastructure.Persistence;

public class ApplicationDbContextInitializer
{
    private readonly ILogger<ApplicationDbContextInitializer> _logger;
    private readonly SeedSettings _settings;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;

    public ApplicationDbContextInitializer(
        ILogger<ApplicationDbContextInitializer> logger,
        IOptions<SeedSettings> appSettings,
        ApplicationDbContext context,
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager
        )
    {
        _logger = logger;
        _settings = appSettings.Value;
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
            _logger.LogError(ex, "An error occurred while initializing the database");
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
            _logger.LogError(ex, "An error occurred while seeding the database");
            throw;
        }
    }

    private async Task TrySeedAsync()
    {
        foreach (var role in ApplicationRole.SupportedRoles)
        {
            if (await _roleManager.FindByNameAsync(role) == null)
            {
                await _roleManager.CreateAsync(new ApplicationRole()
                {
                    Name = role
                });

                _logger.LogInformation("Seeded role " + role);
            }
        }

        if (await _userManager.FindByEmailAsync(_settings.AdminEmail) == null)
        {
            var admin = new ApplicationUser()
            {
                UserName = _settings.AdminEmail,
                Email = _settings.AdminEmail,
                Affiliation = string.Empty,
                Country = string.Empty,
                Webpage = string.Empty,
                IsAdmin = true,
                FirstName = "Admin",
                LastName = "User"
            };

            await _userManager.CreateAsync(admin, _settings.AdminPassword);
            _logger.LogInformation("Seeded root user " + admin.Email);
        }
    }
}
