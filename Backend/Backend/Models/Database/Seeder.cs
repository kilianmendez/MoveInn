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
            if (await _dataContext.Users.AnyAsync()) return;

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
                    Degree = "Web Application Development",
                    City = "Izmir",
                    ErasmusCountry = "Turkey",
                    Nationality = "Morocco",
                    ErasmusDate = new DateOnly(2025, 3, 14),
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/yasiirr7" }
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
                    Nationality = "España",
                    ErasmusDate = new DateOnly(2025, 4, 20),
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
                    Nationality = "España",
                    ErasmusDate = new DateOnly(2025, 5, 5),
                    SocialMedias = new List<SocialMediaLink>
                    {
                        new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/fakeKilian" },
                        new SocialMediaLink { SocialMedia = SocialMedia.X, Url = "https://x.com/fakeKilian" }
                    }
                }
            };
            _dataContext.Users.AddRange(users);

            var rec1 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Restaurante La Buena Mesa",
                Description = "Excelente comida local y ambiente familiar.",
                Category = Category.Restaurant,
                Address = "Calle Principal 123",
                City = "Málaga",
                Country = "España",
                Rating = Rating.Five,
                CreatedAt = DateTime.UtcNow
            };
            var rec2 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Museo de Arte Moderno",
                Description = "Exposiciones temporales y colecciones permanentes impresionantes.",
                Category = Category.Museum,
                Address = "Calle Anormal 456",
                City = "Sevilla",
                Country = "España",
                Rating = Rating.Four,
                CreatedAt = DateTime.UtcNow
            };
            _dataContext.Recommendations.AddRange(rec1, rec2);

            var accoms = new List<Accommodation>
            {
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Apartamento céntrico en Madrid",
                    Description = "Cómodo apartamento en el corazón de Madrid",
                    Address = "Calle Gran Vía 123",
                    City = "Madrid",
                    Country = "España",
                    PricePerMonth = 1200m,
                    NumberOfRooms = 2,
                    Bathrooms = 1,
                    SquareMeters = 75,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025,6,1),
                    AvailableTo = new DateTime(2025,12,25),
                    OwnerId = users[0].Id,
                    AcommodationType = AcommodationType.Apartment,
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
                    PricePerMonth = 1500m,
                    NumberOfRooms = 1,
                    Bathrooms = 1,
                    SquareMeters = 40,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025,6,1),
                    AvailableTo = new DateTime(2025,12,31),
                    OwnerId = users[1].Id,
                    AcommodationType = AcommodationType.Apartment,
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
                    PricePerMonth = 1800m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025,1,1),
                    AvailableTo = new DateTime(2025,5,31),
                    OwnerId = users[2].Id,
                    AcommodationType = AcommodationType.Rural,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/barcelona1.jpg" }
                    }
                }
            };
            _dataContext.Accommodations.AddRange(accoms);

            var events = new List<Event>
            {
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Weekend Trip to Montserrat",
                    Date = new DateTime(2025,9,19,9,0,0),
                    Location = "Meeting at Plaça Catalunya",
                    Address = "Plaça Catalunya, Barcelona",
                    AttendeesCount = 0,
                    MaxAttendees = 30,
                    Category = "Trip",
                    Description = "Join us for a day trip to the beautiful mountain of Montserrat!",
                    Organizer = "Erasmus Outdoor Club",
                    ImageUrl = "events/montserrat-trip.jpg",
                    Tags = new List<string> { "Hiking", "Nature", "Adventure" },
                    CreatorId = users[0].Id
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Cooking Class: Paella Workshop",
                    Date = new DateTime(2025,7,12,17,30,0),
                    Location = "Kitchen Lab Barcelona",
                    Address = "Carrer de Mallorca 250, Barcelona",
                    AttendeesCount = 0,
                    MaxAttendees = 20,
                    Category = "Workshop",
                    Description = "Learn to cook authentic paella with a local chef.",
                    Organizer = "Barcelona Foodies",
                    ImageUrl = "events/paella-workshop.jpg",
                    Tags = new List<string> { "Cooking", "Culture", "Food" },
                    CreatorId = users[1].Id
                }
            };
            _dataContext.Events.AddRange(events);
        }
    }
}
