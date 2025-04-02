using Backend.Models.Database.Entities;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;

public class DataContext : DbContext
{
    private const string DATABASE_PATH = "MoveInnDB.db";

    public DbSet<User> Users { get; set; }
    public DbSet<Accommodation> Accommodations { get; set; }

    public DbSet<Recommendation> Recommendations { get; set; }
    public DbSet<Image> Images { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.LogTo(Console.WriteLine);
        optionsBuilder.EnableSensitiveDataLogging();

        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        string connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

#if DEBUG
        optionsBuilder.UseSqlite($"DataSource={baseDir}{DATABASE_PATH}");
#else
        optionsBuilder.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString));
#endif
    }
}