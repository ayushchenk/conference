using ConferenceManager.Domain.Entities;
using ConferenceManager.Infrastructure.Util;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Data;

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

        var admin = new ApplicationUser()
        {
            UserName = "admin@localhost.com",
            Email = "admin@localhost.com",
            Affiliation = string.Empty,
            Country = string.Empty,
            Webpage = string.Empty,
            FirstName = "Admin",
            LastName = "User"
        };

        if (await _userManager.FindByEmailAsync(admin.Email) == null)
        {
            await _userManager.CreateAsync(admin, _settings.AdminPassword);
            _logger.LogInformation("Seeded root user " + admin.Email);

            var adminConference = new Conference()
            {
                Title = _settings.AdminConference,
                StartDate = DateTime.Now,
                EndDate = DateTime.Now,
                CreatedById = admin.Id,
                ModifiedById = admin.Id,
                Acronym = string.Empty,
                Organizer = string.Empty,
                ResearchAreas = string.Empty
            };

            _logger.LogInformation("Seeded root conference " + adminConference.Title);

            _context.Conferences.Add(adminConference);
            await _context.SaveChangesAsync();

            var adminRole = new UserConferenceRole()
            {
                UserId = admin.Id,
                RoleId = (await _roleManager.FindByNameAsync(ApplicationRole.Admin))?.Id ?? 0,
                ConferenceId = adminConference.Id
            };

            _context.UserRoles.Add(adminRole);
            await _context.SaveChangesAsync();

            _logger.LogInformation("Assigned root user admin role");
        }
    }
}
