FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8000
EXPOSE 8000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
ARG DB_SERVER
ARG DB_USER
ARG DB_PASSWORD
ARG TOKEN_ISSUER
ARG TOKEN_AUDIENCE
ARG TOKEN_KEY
ARG ADMIN_PASSWORD
ARG ADMIN_EMAIL
ARG FRONT_URL
COPY ConferenceManager.sln ./ConferenceManager.sln
COPY ConferenceManager.Api/*.csproj ./ConferenceManager.Api/
COPY ConferenceManager.Core/*.csproj ./ConferenceManager.Core/
COPY ConferenceManager.Domain/*.csproj ./ConferenceManager.Domain/
COPY ConferenceManager.Infrastructure/*.csproj ./ConferenceManager.Infrastructure/
RUN dotnet restore
COPY . .
WORKDIR /src/ConferenceManager.Api
RUN sed -i "s;DB_SERVER;${DB_SERVER};" appsettings.json
RUN sed -i "s;DB_USER;${DB_USER};" appsettings.json
RUN sed -i "s;DB_PASSWORD;${DB_PASSWORD};" appsettings.json
RUN sed -i "s;TOKEN_ISSUER;${TOKEN_ISSUER};" appsettings.json
RUN sed -i "s;TOKEN_AUDIENCE;${TOKEN_AUDIENCE};" appsettings.json
RUN sed -i "s;TOKEN_KEY;${TOKEN_KEY};" appsettings.json
RUN sed -i "s;ADMIN_PASSWORD;${ADMIN_PASSWORD};" appsettings.json
RUN sed -i "s;ADMIN_EMAIL;${ADMIN_EMAIL};" appsettings.json
RUN sed -i "s;FRONT_URL;${FRONT_URL};" appsettings.json
RUN dotnet build "ConferenceManager.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ConferenceManager.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ConferenceManager.Api.dll", "--launch-profile", "docker"]