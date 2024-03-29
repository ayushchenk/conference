using ConferenceManager.Api;
using ConferenceManager.Api.Middleware;
using ConferenceManager.Api.Util;
using ConferenceManager.Core;
using ConferenceManager.Core.Common.Model.Settings;
using ConferenceManager.Infrastructure;
using ConferenceManager.Infrastructure.Persistence;
using ConferenceManager.Infrastructure.Util;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<TokenSettings>(builder.Configuration.GetSection("TokenSettings"));
builder.Services.Configure<SeedSettings>(builder.Configuration.GetSection("SeedSettings"));

builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddCoreServices(builder.Configuration);
builder.Services.AddApiServices(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var initialiser = scope.ServiceProvider.GetRequiredService<ApplicationDbContextInitializer>();
    await initialiser.InitialiseAsync();
    await initialiser.SeedAsync();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<LoggingMiddleware>();

app.UseAuthentication();

app.UseCors(CorsPolicies.Front);

app.UseAuthorization();

app.MapControllers();

app.Run();
