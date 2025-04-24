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
                    LastName = "Rodriguez", 
                    Mail = "christian@gmail.com",
                    Password = AuthService.HashPassword("passwordChristian"),
                    Biography = "Biografía de Christian",
                    Phone = "222222222",
                    AvatarUrl = "default-avatar-url",
                    Role = Role.Administrator,
                    School = "Escuela de Christian", 
                    Degree = "Grado de Christian", 
                    Nationality = "Nacionalidad de Christian",
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
                    LastName = "Méndez",
                    Mail = "kilian@gmail.com",
                    Password = AuthService.HashPassword("passwordKilian"),
                    Biography = "Biografía de Kilian",
                    Phone = "333333333",
                    AvatarUrl = "default-avatar-url", 
                    Role = Role.Administrator,
                    School = "Escuela de Kilian", 
                    Degree = "Grado de Kilian", 
                    Nationality = "Nacionalidad de Kilian", 
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
            var forum = new Forum
            {
                Id = Guid.NewGuid(),
                Title = "Foro de Prueba",
                Description = "Este es un foro para pruebas.",
                Country = "Spain",
                Category = ForumCategory.Otro,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[0].Id,
                Threads = new List<ForumThread>()
            };

            var thread1 = new ForumThread
            {
                Id = Guid.NewGuid(),
                ForumId = forum.Id,
                Title = "Hilo simple",
                Content = "Este hilo tiene mensajes directos al hilo.",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[1].Id,
                Posts = new List<ForumMessages>()
            };

            var message1_thread1 = new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread1.Id,
                Content = "Mensaje 1 en hilo simple",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[2].Id,
                ParentMessageId = null
            };

            var message2_thread1 = new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread1.Id,
                Content = "Mensaje 2 en hilo simple",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[0].Id,
                ParentMessageId = null
            };

            thread1.Posts.Add(message1_thread1);
            thread1.Posts.Add(message2_thread1);

            var thread2 = new ForumThread
            {
                Id = Guid.NewGuid(),
                ForumId = forum.Id,
                Title = "Hilo con respuestas anidadas",
                Content = "Este hilo tiene mensajes y respuestas anidadas.",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[1].Id,
                Posts = new List<ForumMessages>()
            };

            var messageA_thread2 = new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread2.Id,
                Content = "Mensaje A en hilo con respuestas anidadas",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[2].Id,
                ParentMessageId = null
            };

            var messageB_thread2 = new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread2.Id,
                Content = "Mensaje B en hilo con respuestas anidadas",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[0].Id,
                ParentMessageId = null
            };

            var messageC_thread2 = new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread2.Id,
                Content = "Mensaje C, respuesta a mensaje B",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[2].Id,
                ParentMessageId = messageB_thread2.Id
            };

            var messageD_thread2 = new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread2.Id,
                Content = "Mensaje D, respuesta a mensaje A",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[1].Id,
                ParentMessageId = messageA_thread2.Id
            };

            thread2.Posts.Add(messageA_thread2);
            thread2.Posts.Add(messageB_thread2);
            thread2.Posts.Add(messageC_thread2);
            thread2.Posts.Add(messageD_thread2);

            forum.Threads.Add(thread1);
            forum.Threads.Add(thread2);

            _dataContext.Users.AddRange(users);
            _dataContext.Recommendations.AddRange(recommendation1, recommendation2);
            _dataContext.Accommodations.AddRange(accommodations);
            _dataContext.Reservations.AddRange(reservations);
            _dataContext.Reviews.AddRange(reviews);
            _dataContext.Forum.Add(forum);
            await _dataContext.SaveChangesAsync();
        }

    }

}
