FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ConferenceManager.sln ./ConferenceManager.sln
COPY ConferenceManager.Api/*.csproj ./ConferenceManager.Api/
COPY ConferenceManager.Core/*.csproj ./ConferenceManager.Core/
COPY ConferenceManager.Domain/*.csproj ./ConferenceManager.Domain/
COPY ConferenceManager.Infrastructure/*.csproj ./ConferenceManager.Infrastructure/
RUN dotnet restore
COPY . .
WORKDIR /src/ConferenceManager.Api
RUN dotnet build "ConferenceManager.Api.csproj" -c Debug -o /app/build

FROM build AS publish
RUN dotnet publish "ConferenceManager.Api.csproj" -c Debug -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ConferenceManager.Api.dll", "--launch-profile", "docker"]