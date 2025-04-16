using Backend.Models.Database.Entities;
using Backend.Models.Database.Enum;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

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
                    LastName = "Bel Maalem", 
                    Mail = "yasir@gmail.com",
                    Password = AuthService.HashPassword("passwordYasir"),
                    Biography = "Living the Life",
                    Phone = "631387444",
                    AvatarUrl = "default-avatar-url",
                    Role = Role.Administrator,
                    School = "CPIFP Alan Turing",
                    Degree = "Web Aplication Development", 
                    City = "Izmir",
                    Nationality = "Morroco",
                    ErasmusDate = new DateOnly(2025, 3, 14),
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
                    Role = Role.Administrator,
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
                    Role = Role.Administrator,
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
            var recommendation1 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Restaurante La Buena Mesa",
                Description = "Excelente comida local y ambiente familiar.",
                Category = Category.Restaurant,
                Address = "Calle Principal 123",
                City = "Málaga",
                Country = "Spain",
                Rating = Rating.Five,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/restaurant1_1.jpg" },
                }
            };

            var recommendation2 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Museo de Arte Moderno",
                Description = "Exposiciones temporales y colecciones permanentes impresionantes.",
                Category = Category.Museum,
                Address = "Calle Anormal 123",
                City = "Sevilla",
                Country = "Spain",
                Rating = Backend.Models.Database.Enum.Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/museum1_1.jpg" },
                }
            };

            var accommodations = new List<Accommodation>
            {
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Apartamento céntrico en Madrid",
                    Description = "Cómodo apartamento en el corazón de Madrid",
                    Address = "Calle Gran Vía 123",
                    City = "Madrid",
                    Country = "España",
                    PricePerMonth = 1200.00m,
                    NumberOfRooms = 2,
                    Bathrooms = 1,
                    SquareMeters = 75,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 6, 1),
                    AvailableTo = new DateTime(2025, 12, 25),
                    OwnerId = users[0].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/madrid1.jpg" }
                    }
                },
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Estudio en París",
                    Description = "Acogedor estudio cerca de la Torre Eiffel",
                    Address = "Rue de la Paix 45",
                    City = "París",
                    Country = "Francia",
                    PricePerMonth = 1500.00m,
                    NumberOfRooms = 1,
                    Bathrooms = 1,
                    SquareMeters = 40,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 6, 1),
                    AvailableTo = new DateTime(2025, 12, 31),
                    OwnerId = users[1].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/paris1.jpg" }
                    }
                },
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Casa rural en Barcelona",
                    Description = "Amplia casa con vistas a la montaña",
                    Address = "Camí de les Vinyes 789",
                    City = "Barcelona",
                    Country = "España",
                    PricePerMonth = 1800.00m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 1, 1),
                    AvailableTo = new DateTime(2025, 5, 31),
                    OwnerId = users[2].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/barcelona1.jpg" }
                    }
                }
            };

            _dataContext.Users.AddRange(users);
            _dataContext.Recommendations.AddRange(recommendation1, recommendation2);
            _dataContext.Accommodations.AddRange(accommodations);
            await _dataContext.SaveChangesAsync();
        }

    }

}
