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
                    LastName = "Bel Maalem", // Puedes ajustar el apellido
                    Mail = "yasir@gmail.com",
                    Password = AuthService.HashPassword("passwordYasir"),
                    Biography = "Biografía de Yasir",
                    Phone = "111111111",
                    AvatarUrl = "default-avatar-url", // Add this line
                    Role = Role.Administrator,
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
            var reservations = new List<Reservation>
            {
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025, 07, 01),
                    EndDate = new DateTime(2025, 07, 10),
                    TotalPrice = 1200.00m,
                    Status = ReservationStatus.Pending,
                    UserId = users[0].Id,
                    AccommodationId = accommodations[0].Id
                },
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025, 08, 01),
                    EndDate = new DateTime(2025, 08, 05),
                    TotalPrice = 1500.00m,
                    Status = ReservationStatus.Confirmed,
                    UserId = users[1].Id,
                    AccommodationId = accommodations[1].Id
                },
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025, 09, 01),
                    EndDate = new DateTime(2025, 09, 03),
                    TotalPrice = 1800.00m,
                    Status = ReservationStatus.Cancelled,
                    UserId = users[2].Id,
                    AccommodationId = accommodations[2].Id
                },
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025, 06, 01),
                    EndDate = new DateTime(2025, 06, 15),
                    TotalPrice = 2000.00m,
                    Status = ReservationStatus.Completed,
                    UserId = users[0].Id,
                    AccommodationId = accommodations[1].Id
                }
            };
            var reviews = new List<Review>
            {
                new Review
                {
                    Id = Guid.NewGuid(),
                    Title = "Excelente experiencia",
                    Content = "El alojamiento superó mis expectativas y la atención fue impecable.",
                    Rating = Rating.Five,
                    CreatedAt = DateTime.UtcNow,
                    ReservationId = reservations[3].Id, 
                    UserId = reservations[3].UserId
                },
                new Review
                {
                    Id = Guid.NewGuid(),
                    Title = "Buena, pero puede mejorar",
                    Content = "Aunque el lugar es bonito, la limpieza y algunos servicios deben mejorar.",
                    Rating = Rating.Three,
                    CreatedAt = DateTime.UtcNow,
                    ReservationId = reservations[0].Id,
                    UserId = reservations[0].UserId
                },
                new Review
                {
                    Id = Guid.NewGuid(),
                    Title = "No se cumplió lo prometido",
                    Content = "Tuve inconvenientes con la reserva y la comunicación no fue clara.",
                    Rating = Rating.Two,
                    CreatedAt = DateTime.UtcNow,
                    ReservationId = reservations[2].Id,
                    UserId = reservations[2].UserId
                }
            };

            _dataContext.Users.AddRange(users);
            _dataContext.Recommendations.AddRange(recommendation1, recommendation2);
            _dataContext.Accommodations.AddRange(accommodations);
            _dataContext.Reservations.AddRange(reservations);
            _dataContext.Reviews.AddRange(reviews);
            await _dataContext.SaveChangesAsync();
        }

    }

}
