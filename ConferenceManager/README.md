# How to run

## Build and run locally using .NET

Prerequisites:
- .NET 7 SDK - [Download link](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- MS SQL Server - [Download link](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) 
- SQL Server Management Studio - [Download link](https://learn.microsoft.com/ru-ru/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)

1. Prepare `appsettings.Development.json` file using following template, put them in ConferenceManager.Api folder

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=<server name from management studio>;Database=ConferenceManager;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  },
  "TokenSettings": {
    "Issuer": "localhost",
    "Audience": "localhost",
    "Key": "localhost_cool_key_haha",
    "ExpiresMinutes": 60
  },
  "SeedSettings": {
    "AdminPassword":  "C00!P@ssword" //admin login is admin@localhost.com
  }
}
```

2. Open ConferenceManager folder, run following commands

```shell
dotnet dev-certs https --trust
dotnet build
dotnet run --project ./ConferenceManager.Api --launch-profile https
```

> You only need to run dev-certs once

3. Navigate to https://localhost:7157/swagger

## Build and run locally using Docker

>!Work in progress! This solution is currently build on workarounds

1. In ConferenceManager folder:

```shell
docker build -t <image>
docker run p 8000:80 -p 8001:443 <image>
```

2. In container, update appsettings.json, use following connection string, restart container:

>Make sure MS SQL server allows tcp connections, tcp:1433 port is open in firewall

```
Server=host.docker.internal,1433;User ID=<local sql login>;Password=<local sql password>;Database=ConferenceManager;Trusted_Connection=false;MultipleActiveResultSets=true;TrustServerCertificate=True
```

3. Navigate to https://localhost:8001/swagger 

# Other

## How to create migration

Run in Infrastructure folder:

```shell
 dotnet ef migrations add <name> --output-dir Persistence/Migrations -v --project .\ConferenceManager.Infrastructure.csproj --startup-project ..\ConferenceManager.Api\ConferenceManager.Api.csproj
```