# Use the .NET 8 SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy the solution file and project files first to leverage Docker layer caching
COPY Backend.sln .
COPY Backend/Backend.csproj ./Backend/

# Restore dependencies for the project
RUN dotnet restore "./Backend/Backend.csproj"

# Copy the rest of the source code
COPY . .

# Publish the application to a directory, creating a release build
RUN dotnet publish "./Backend/Backend.csproj" -c Release -o /app/publish

# Use the ASP.NET 8 runtime image for the final, smaller image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Create the wwwroot directory for static files
RUN mkdir -p wwwroot/images

# Expose port 8080 to the outside world
EXPOSE 8080

# Define the command to run your app
ENTRYPOINT ["dotnet", "Backend.dll"]