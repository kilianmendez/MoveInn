using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
            // Si ya hay datos, no hacer nada
            if (await _dataContext.Users.AnyAsync())
                return;

            await Seed();
            await _dataContext.SaveChangesAsync();
        }

        private async Task Seed()
        {
            // 1) Usuarios
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
                    AvatarUrl = "images/Yasir.jpeg",
                    Role = Role.Administrator,
                    School = "CPIFP Alan Turing",
                    Degree = "Web Aplication Development",
                    City = "Izmir",
                    ErasmusCountry = "Turkey",
                    Nationality = "Morocco",
                    ErasmusDate = new DateOnly(2025, 3, 14),
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/yasiirr7" },
                    }
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Name = "Kilian",
                    LastName = "Méndez Ávila",
                    Mail = "kilian@gmail.com",
                    Password = AuthService.HashPassword("passwordKilian"),
                    Biography = "De erasmus en Turquía",
                    Phone = "635893667",
                    AvatarUrl = "images/default-avatar-url.jpeg",
                    Role = Role.Lessor,
                    School = "CPIFP Alan Turing",
                    Degree = "Web Aplication Development",
                    City = "Izmir",
                    ErasmusCountry = "Turkey",
                    Nationality = "Spain",
                    ErasmusDate = new DateOnly(2025, 3, 14),
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Facebook, Url = "https://facebook.com/ki_mendez" },
                    }
                },
                new User
                {
                    Id = Guid.NewGuid(),
                    Name = "Christian",
                    LastName = "Rodriguez Lara",
                    Mail = "christian@gmail.com",
                    Password = AuthService.HashPassword("passwordChristian"),
                    Biography = "Hola Izmir!!!",
                    Phone = "667896654",
                    AvatarUrl = "images/default-avatar-url.jpeg",
                    Role = Role.Administrator,
                    School = "CPIFP Alan Turing",
                    Degree = "Web Aplication Development",
                    City = "Izmir",
                    ErasmusCountry = "Turkey",
                    Nationality = "Spain",
                    ErasmusDate = new DateOnly(2025, 3, 14),
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.X, Url = "https://x.com/christian_rod" },
                    }
                }
            };
            _dataContext.Users.AddRange(users);

            // 2) Recomendaciones
            var rec1 = new Recommendation
            {
                Id = Guid.NewGuid(),
                UserId = users[0].Id,
                Title = "La Cacharrería",
                Description = "Cafetería con un estilo vintage ideal para desayunar tostadas gourmet y cafés especiales.",
                Category = Category.Cafeteria,
                Address = "Calle Regina, 14, 41003 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Five,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/LaCacharreria.jpeg" }
                }
            };
            var rec2 = new Recommendation
            {
                Id = Guid.NewGuid(),
                UserId = users[1].Id,
                Title = "El Pintón",
                Description = "Restaurante moderno en el centro histórico que fusiona cocina andaluza con toques internacionales.",
                Category = Category.Restaurant,
                Address = "Calle Francos, 42, 41004 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/ElPinton.jpg" },
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/ElPinton2.jpg" }
                }
            };
            var rec3 = new Recommendation
            {
                Id = Guid.NewGuid(),
                UserId = users[2].Id,
                Title = "Museo de Bellas Artes de Sevilla",
                Description = "Una de las pinacotecas más importantes de España, con una colección destacada de pintura barroca.",
                Category = Category.Museum,
                Address = "Plaza del Museo, 9, 41001 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Museo.jpg" },
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Museo2.jpg" }
                }
            };
            var rec4 = new Recommendation
            {
                Id = Guid.NewGuid(),
                UserId = users[0].Id,
                Title = "Parque de María Luisa",
                Description = "Espacio verde emblemático de Sevilla, ideal para pasear y disfrutar de su exuberante vegetación.",
                Category = Category.Park,
                Address = "Av. de María Luisa, s/n, 41013 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Parque.jpg" },
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Parque2.jpg" }
                }
            };
            _dataContext.Recommendations.AddRange(rec1, rec2, rec3, rec4);

            // 3) Alojamientos
            var accommodations = new List<Accommodation>
            {
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Apartamento céntrico en Madrid",
                    Description = "Cómodo apartamento en el corazón de Madrid",
                    Address = "Calle Gran Vía 123",
                    City = "Madrid",
                    Country = "Spain",
                    PricePerMonth = 1200.00m,
                    NumberOfRooms = 2,
                    Bathrooms = 1,
                    SquareMeters = 75,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025,6,1),
                    AvailableTo = new DateTime(2025,12,25),
                    OwnerId = users[0].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Madrid1.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Madrid2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Madrid3.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Madrid4.jpg" }
                    }
                },
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Estudio pequeño en Retiro",
                    Description = "Acogedor estudio cerca del Parque del Retiro",
                    Address = "Calle del Retiro 56",
                    City = "Madrid",
                    Country = "Spain",
                    PricePerMonth = 1500.00m,
                    NumberOfRooms = 1,
                    Bathrooms = 1,
                    SquareMeters = 40,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025,6,1),
                    AvailableTo = new DateTime(2025,12,31),
                    OwnerId = users[1].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Retiro1.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Retiro2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Retiro3.jpg" }
                    }
                },
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Apartamento clásico en Barcelona",
                    Description = "Amplio apartamento con vistas a la Sagrada Familia",
                    Address = "Carrer de Mallorca, 401",
                    City = "Barcelona",
                    Country = "Spain",
                    PricePerMonth = 1800.00m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025,1,1),
                    AvailableTo = new DateTime(2025,5,31),
                    OwnerId = users[2].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/BCN1.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/BCN2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/BCN3.jpg" }
                    }
                }
            };
            _dataContext.Accommodations.AddRange(accommodations);

            var reservations = new List<Reservation>
            {
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025,7,1),
                    EndDate = new DateTime(2025,7,10),
                    TotalPrice = 1200.00m,
                    Status = ReservationStatus.Pending,
                    UserId = users[0].Id,
                    AccommodationId = accommodations[0].Id
                },
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025,8,1),
                    EndDate = new DateTime(2025,8,5),
                    TotalPrice = 1500.00m,
                    Status = ReservationStatus.Confirmed,
                    UserId = users[1].Id,
                    AccommodationId = accommodations[1].Id
                },
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025,9,1),
                    EndDate = new DateTime(2025,9,3),
                    TotalPrice = 1800.00m,
                    Status = ReservationStatus.Cancelled,
                    UserId = users[2].Id,
                    AccommodationId = accommodations[2].Id
                },
                new Reservation
                {
                    Id = Guid.NewGuid(),
                    StartDate = new DateTime(2025,6,1),
                    EndDate = new DateTime(2025,6,15),
                    TotalPrice = 2000.00m,
                    Status = ReservationStatus.Completed,
                    UserId = users[0].Id,
                    AccommodationId = accommodations[1].Id
                }
            };
            _dataContext.Reservations.AddRange(reservations);

            // 5) Reseñas
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
            _dataContext.Reviews.AddRange(reviews);

            // 6) Foros, hilos y mensajes
            var forum1 = new Forum
            {
                Id = Guid.NewGuid(),
                Title = "Foro de Prueba",
                Description = "Este es un foro para pruebas.",
                Country = "Spain",
                Category = ForumCategory.Other,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[0].Id,
                Threads = new List<ForumThread>()
            };

            var thread1 = new ForumThread
            {
                Id = Guid.NewGuid(),
                ForumId = forum1.Id,
                Title = "Hilo simple",
                Content = "Este hilo tiene mensajes directos al hilo.",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[1].Id,
                Posts = new List<ForumMessages>()
            };
            thread1.Posts.Add(new ForumMessages
            {
                Id = Guid.NewGuid(),
                ThreadId = thread1.Id,
                Content = "Primer mensaje",
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[2].Id
            });
            forum1.Threads.Add(thread1);

            var forum2 = new Forum
            {
                Id = Guid.NewGuid(),
                Title = "My First Culture Shock in Germany!",
                Description = "My first days in Germany were full of surprises…",
                Country = "Germany",
                Category = ForumCategory.CulturalAndSocialIntegration,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[0].Id,
                Threads = new List<ForumThread>()
            };

            var events = new List<Event>
            {
                new Event
                {
                    Id = Guid.NewGuid(),
                    CreatorId = users[0].Id,
                    Title = "Weekend Trip to Montserrat",
                    Date = new DateTime(2025,9,19,9,0,0),
                    Location = "Meeting at Plaça Catalunya",
                    Address = "Plaça Catalunya, Barcelona",
                    AttendeesCount = 0,
                    MaxAttendees = 30,
                    
                    Category = EventCategory.Trip,
                    Description = "Join us for a day trip to the beautiful mountain of Montserrat!",
                    ImageUrl = "events/montserrat-trip.jpg",
                    Tags = new List<string> { "Hiking", "Nature", "Adventure" },
                    Participants = new List<User> { users[1], users[2] }
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    CreatorId = users[1].Id,
                    Title = "City Food Tour",
                    Date = new DateTime(2025,10,5,11,30,0),
                    Location = "Plaza Mayor",
                    Address = "Plaza Mayor, Madrid",
                    AttendeesCount = 0,
                    MaxAttendees = 100, 
                    Category = EventCategory.Food,
                    Description = "Degustación de tapas por los mejores bares de la ciudad.",
                    ImageUrl = "events/food-tour.jpg",
                    Tags = new List<string> { "Food", "Culture", "Tour" },
                    Participants = new List<User> { users[0] }
                }
            };
            _dataContext.Events.AddRange(events);

            _dataContext.Forum.AddRange(forum1, forum2);
        }
    }
}
