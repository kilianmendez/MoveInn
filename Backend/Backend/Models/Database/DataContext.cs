using Backend.Models.Database.Entities;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using System.Reflection.Emit;

public class DataContext : DbContext
{
    //private const string DATABASE_PATH = "MoveInnDB.db";
    public DataContext(DbContextOptions<DataContext> options): base(options)
    {

    
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Accommodation> Accommodations { get; set; }

    public DbSet<Recommendation> Recommendations { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<ImageAccommodation> ImageAccommodations { get; set; }
    public DbSet<SocialMediaLink> SocialMediaLinks { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Follow> Follows { get; set; }
    public DbSet<Messages> Messages { get; set; }
    public DbSet<Forum> Forum { get; set; }
    public DbSet<ForumThread> ForumsThread { get; set; }
    public DbSet<ForumMessages> ForumsMessages { get; set; }
    public DbSet<Review> Reviews { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        //optionsBuilder.LogTo(Console.WriteLine);
        //optionsBuilder.EnableSensitiveDataLogging();

        //string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        //string databasePath = $"{baseDir}{DATABASE_PATH}";

        //optionsBuilder.UseSqlite($"DataSource={databasePath}");
    }
}