using System.Text;
using System.Text.Json.Serialization;
using Backend.Models.Database;
using Backend.Models.Database.Repositories;
using Backend.Models.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;


namespace Backend;
public class Program
{
    public static async Task Main(string[] args)
    {
        Directory.SetCurrentDirectory(AppContext.BaseDirectory);

        var builder = WebApplication.CreateBuilder(args);

        //A�adimos la configuracion en AppSettings
        builder.Services.Configure<Settings>(builder.Configuration.GetSection(Settings.SECTION_NAME));
        // Add services to the container.

        builder.Services.AddControllers();
        builder.Services.AddControllers().AddJsonOptions(options => {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });


        //Contextos
        builder.Services.AddScoped<DataContext>();
        builder.Services.AddScoped<UserRepository>();
        builder.Services.AddScoped<RecommendationRepository>();
        builder.Services.AddScoped<UnitOfWork>();
        builder.Services.AddScoped<IAccommodationRepository, AccommodationRepository>();
        builder.Services.AddScoped<ReservationRepository>();
        builder.Services.AddScoped<IReviewRepository, ReviewRepository>();


        // Servicios
        builder.Services.AddScoped<AuthService>();
        builder.Services.AddScoped<UserService>();
        builder.Services.AddScoped<IAccommodationService, AccommodationService>();
        builder.Services.AddScoped<RecommendationService>();
        builder.Services.AddScoped<ReservationService>();
        builder.Services.AddHttpClient("CountriesNow", client =>
        {
            client.BaseAddress = new Uri("https://countriesnow.space/api/v0.1/");
            client.DefaultRequestHeaders.Add("Accept", "application/json");
        });
        builder.Services.AddScoped<CountriesNowService>();
        builder.Services.AddScoped<SmartSearchService>();
        builder.Services.AddScoped<IReviewService, ReviewService>();


        //Swagger
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "Authorization",
                Description = "Token",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });
            options.OperationFilter<SecurityRequirementsOperationFilter>(true, JwtBearerDefaults.AuthenticationScheme);
        });

        builder.Services.AddAuthentication()
        .AddJwtBearer(options =>
        {
            Settings settings = builder.Configuration.GetSection(Settings.SECTION_NAME).Get<Settings>()!;
            string key = Environment.GetEnvironmentVariable("JWT_KEY");

            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
            };
        });

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors();
        app.UseAuthentication();
        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot"))
        });
        app.MapControllers();
        await SeedDatabase(app.Services);

        app.Run();
    }
    static async Task SeedDatabase(IServiceProvider serviceProvider)
    {
        using IServiceScope scope = serviceProvider.CreateScope();
        using DataContext dbContext = scope.ServiceProvider.GetService<DataContext>()!;

        if (dbContext.Database.EnsureCreated())
        {
            Seeder seeder = new Seeder(dbContext);
            await seeder.SeedAsync();
        }

    }
}