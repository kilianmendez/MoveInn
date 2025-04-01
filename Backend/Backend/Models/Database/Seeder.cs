using Backend.Models.Database.Entities;
using Backend.Models.Database.Enum;
using Backend.Services;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Models.Database
{
    public class Seeder
    {
        private readonly DataContext _dataContext;

        public Seeder(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task SeedAsync()
        {
            // Evitamos sembrar si ya existen usuarios
            if (await _dataContext.Users.AnyAsync())
            {
                return;
            }

            await Seed();
            await _dataContext.SaveChangesAsync();
        }

        public async Task Seed()
        {
        var users = new List<User>
                 {
                new User
                {
                    Id = Guid.NewGuid(),
                    Name = "Yasir",
                    LastName = "Bel Maalem", // Puedes ajustar el apellido
                    Mail = "yasir@gmail.com",
                    Password = AuthService.HashPassword("passwordYasir"),
                    Biography = "Biografía de Yasir",
                    Phone = "111111111",
                    AvatarUrl = "default-avatar-url", // Add this line
                    Role = Role.User,
                    School = "Escuela de Yasir", // Add this line
                    Degree = "Grado de Yasir", // Add this line
                    Nationality = "Nacionalidad de Yasir", // Add this line
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Facebook, Url = "https://facebook.com/fakeYasir" },
                        new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/fakeYasir" }
                    }
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Name = "Christian",
                    LastName = "Rodriguez", // Puedes ajustar el apellido
                    Mail = "christian@gmail.com",
                    Password = AuthService.HashPassword("passwordChristian"),
                    Biography = "Biografía de Christian",
                    Phone = "222222222",
                    AvatarUrl = "default-avatar-url", // Add this line
                    Role = Role.User,
                    School = "Escuela de Christian", // Add this line
                    Degree = "Grado de Christian", // Add this line
                    Nationality = "Nacionalidad de Christian", // Add this line
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Facebook, Url = "https://facebook.com/fakeChristian" },
                        new SocialMediaLink { SocialMedia = SocialMedia.X, Url = "https://x.com/fakeChristian" }
                    }
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Name = "Kilian",
                    LastName = "Méndez", // Puedes ajustar el apellido
                    Mail = "kilian@gmail.com",
                    Password = AuthService.HashPassword("passwordKilian"),
                    Biography = "Biografía de Kilian",
                    Phone = "333333333",
                    AvatarUrl = "default-avatar-url", // Add this line
                    Role = Role.User,
                    School = "Escuela de Kilian", // Add this line
                    Degree = "Grado de Kilian", // Add this line
                    Nationality = "Nacionalidad de Kilian", // Add this line
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/fakeKilian" },
                        new SocialMediaLink { SocialMedia = SocialMedia.X, Url = "https://x.com/fakeKilian" }
                    }
                    }
                };

            _dataContext.Users.AddRange(users);
        }

    }
}