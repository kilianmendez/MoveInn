﻿using Backend.Models.Database.Entities;
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
        Name = "Kilian",
        LastName = "Méndez Ávila",
        Mail = "kilian@gmail.com",
        Password = AuthService.HashPassword("passwordKilian"),
        Biography = "De erasmus en Barcelona",
        Phone = "635893667",
        AvatarUrl = "default-avatar-url",
        Role = Role.Administrator,
        School = "CPIFP Alan Turing",
        Degree = "Web Aplication Development",
        City = "Barcelona",
        ErasmusCountry = "Spain",
        Nationality = "Spain",
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
        LastName = "Rodriguez Lara",
        Mail = "christian@gmail.com",
        Password = AuthService.HashPassword("passwordchristian"),
        Biography = "Hola Izmir!!!",
        Phone = "667896654",
        AvatarUrl = "default-avatar-url",
        Role = Role.Administrator,
        School = "CPIFP Alan Turing",
        Degree = "Web Aplication Development",
        City = "Izmir",
        ErasmusCountry = "Turkey",
        Nationality = "Spain",
        ErasmusDate = new DateOnly(2025, 3, 14),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/yasiirr7" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Marco",
        LastName = "Rivercci Corleone",
        Mail = "marco@gmail.com",
        Password = AuthService.HashPassword("passwordMarco"),
        Biography = "Finally in Germany!!!",
        Phone = "667896654",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University Fritz",
        Degree = "Mechanical engeneering",
        City = "Munich",
        ErasmusCountry = "Germany",
        Nationality = "Italian",
        ErasmusDate = new DateOnly(2025, 3, 14),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/yasiirr7" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Lina",
        LastName = "Martinez Lopez",
        Mail = "lina@gmail.com",
        Password = AuthService.HashPassword("passwordLina"),
        Biography = "Living my Erasmus dream in Lisbon!",
        Phone = "641223344",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University of Barcelona",
        Degree = "Business Administration",
        City = "Lisbon",
        ErasmusCountry = "Portugal",
        Nationality = "Spain",
        ErasmusDate = new DateOnly(2025, 2, 1),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.X, Url = "https://twitter.com/linaerasmus" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Jonas",
        LastName = "Schneider",
        Mail = "jonas@gmail.com",
        Password = AuthService.HashPassword("passwordJonas"),
        Biography = "Exploring new cultures and food!",
        Phone = "654789123",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "TU Berlin",
        Degree = "Computer Science",
        City = "Barcelona",
        ErasmusCountry = "Spain",
        Nationality = "Germany",
        ErasmusDate = new DateOnly(2025, 4, 5),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://linkedin.com/in/jonass" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Maja",
        LastName = "Nowak",
        Mail = "maja@gmail.com",
        Password = AuthService.HashPassword("passwordMaja"),
        Biography = "Can't wait to visit the Sagrada Familia!",
        Phone = "612345678",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University of Warsaw",
        Degree = "Architecture",
        City = "Barcelona",
        ErasmusCountry = "Spain",
        Nationality = "Poland",
        ErasmusDate = new DateOnly(2025, 3, 1),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/maja_travel" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Pierre",
        LastName = "Dubois",
        Mail = "pierre@gmail.com",
        Password = AuthService.HashPassword("passwordPierre"),
        Biography = "Studying and surfing in Lisbon 😎",
        Phone = "698754321",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "Sorbonne University",
        Degree = "Philosophy",
        City = "Lisbon",
        ErasmusCountry = "Portugal",
        Nationality = "France",
        ErasmusDate = new DateOnly(2025, 2, 20),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/pierre_d" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Sophia",
        LastName = "Papadopoulos",
        Mail = "sophia@gmail.com",
        Password = AuthService.HashPassword("passwordSophia"),
        Biography = "Erasmus in Prague - loving the culture!",
        Phone = "699112233",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University of Athens",
        Degree = "International Relations",
        City = "Prague",
        ErasmusCountry = "Czech Republic",
        Nationality = "Greece",
        ErasmusDate = new DateOnly(2025, 3, 10),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Facebook, Url = "https://facebook.com/sophiaerasmus" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Lucas",
        LastName = "Carvalho",
        Mail = "lucas@gmail.com",
        Password = AuthService.HashPassword("passwordLucas"),
        Biography = "Soaking up the Italian sun and culture",
        Phone = "676889900",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University of São Paulo",
        Degree = "Law",
        City = "Rome",
        ErasmusCountry = "Italy",
        Nationality = "Brazil",
        ErasmusDate = new DateOnly(2025, 3, 5),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://tiktok.com/@lucasitalia" }
        }
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Anna",
        LastName = "Ivanova",
        Mail = "anna@gmail.com",
        Password = AuthService.HashPassword("passwordAnna"),
        Biography = "Exploring Vienna and Austrian culture!",
        Phone = "644556677",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "Moscow State University",
        Degree = "History",
        City = "Vienna",
        ErasmusCountry = "Austria",
        Nationality = "Russia",
        ErasmusDate = new DateOnly(2025, 2, 25),
        SocialMedias = new List<SocialMediaLink>()
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Nora",
        LastName = "Eriksen",
        Mail = "nora@gmail.com",
        Password = AuthService.HashPassword("passwordNora"),
        Biography = "Enjoying student life in Italy 🍝",
        Phone = "611223344",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University of Oslo",
        Degree = "Political Science",
        City = "Florence",
        ErasmusCountry = "Italy",
        Nationality = "Norway",
        ErasmusDate = new DateOnly(2025, 2, 18),
        SocialMedias = new List<SocialMediaLink>()
    },
    new User
    {
        Id = Guid.NewGuid(),
        Name = "Yuki",
        LastName = "Takahashi",
        Mail = "yuki@gmail.com",
        Password = AuthService.HashPassword("passwordYuki"),
        Biography = "Loving Paris and all the art 🎨",
        Phone = "699887766",
        AvatarUrl = "default-avatar-url",
        Role = Role.User,
        School = "University of Tokyo",
        Degree = "Fine Arts",
        City = "Paris",
        ErasmusCountry = "France",
        Nationality = "Japan",
        ErasmusDate = new DateOnly(2025, 4, 10),
        SocialMedias = new List<SocialMediaLink>
        {
            new SocialMediaLink { SocialMedia = SocialMedia.Instagram, Url = "https://instagram.com/yukiart" }
        },
        Languages = new List<UserLanguage>
        {
            new UserLanguage { Id = Guid.NewGuid(), Language = "Japanese", Level = LanguageLevel.Native },
            new UserLanguage { Id = Guid.NewGuid(), Language = "French", Level = LanguageLevel.C1 }
        }
    }
};


            var recommendation1 = new Recommendation
            {
                Id = Guid.NewGuid(),
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
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/LaCacharreria.jpeg" },
                }
            };

            var recommendation2 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "El Pintón",
                Description = "Restaurante moderno en el centro histórico que fusiona cocina andaluza con toques internacionales.",
                Category = Category.Restaurant,
                Address = "Calle Francos, 42, 41004 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Backend.Models.Database.Enum.Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/ElPinton.jpg" },
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/ElPinton2.jpg" }
                }
            };

            var recommendation3 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Museo de Bellas Artes de Sevilla",
                Description = "Una de las pinacotecas más importantes de España, con una colección destacada de pintura barroca.",
                Category = Category.Museum,
                Address = "Plaza del Museo, 9, 41001 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Backend.Models.Database.Enum.Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Museo.jpg" },
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Museo2.jpg" }
                }
            };

            var recommendation4 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Parque de María Luisa",
                Description = "Espacio verde emblemático de Sevilla, ideal para pasear y disfrutar de su exuberante vegetación.",
                Category = Category.Park,
                Address = "Av. de María Luisa, s/n, 41013 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Backend.Models.Database.Enum.Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Parque.jpg" },
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Parque2.jpg" }
                }
            };
            var recommendation5 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Isla Mágica",
                Description = "Parque temático con atracciones acuáticas y espectáculos, ideal para pasar el día con amigos.",
                Category = Category.LeisureZone,
                Address = "Pabellón de España, Camino de los Descubrimientos, 41092 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/IslaMagica.jpg" }
                }
            };

            var recommendation6 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Alcázar de Sevilla",
                Description = "Complejo palaciego real de impresionante arquitectura mudéjar e historia profunda.",
                Category = Category.HistoricalSite,
                Address = "Patio de Banderas, s/n, 41004 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Five,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/Alcazar.jpg" }
                }
            };

            var recommendation7 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Centro Comercial Torre Sevilla",
                Description = "Centro comercial moderno con tiendas de moda, restaurantes y mirador panorámico.",
                Category = Category.Shopping,
                Address = "Calle Gonzalo Jiménez de Quesada, 2, 41092 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Three,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/TorreSevilla.jpg" }
                }
            };

            var recommendation8 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "La Terraza de EME",
                Description = "Bar con vistas espectaculares a la Giralda, ideal para copas al atardecer.",
                Category = Category.Bar,
                Address = "Calle Alemanes, 27, 41004 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Four,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/TerrazaEME.jpg" }
                }
            };

            var recommendation9 = new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = "Rincón Secreto",
                Description = "Espacio cultural emergente con exposiciones temporales y arte alternativo.",
                Category = Category.Other,
                Address = "Calle San Luis, 70, 41003 Sevilla",
                City = "Sevilla",
                Country = "Spain",
                Rating = Rating.Three,
                CreatedAt = DateTime.UtcNow,
                RecommendationImages = new List<Image>
                {
                    new Image { Id = Guid.NewGuid(), Url = "recommendations/RinconSecreto.jpg" }
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
                    Country = "Spain",
                    PricePerMonth = 1200.00m,
                    NumberOfRooms = 2,
                    Bathrooms = 1,
                    SquareMeters = 75,
                    AcommodationType = AcommodationType.Apartment,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 6, 1),
                    AvailableTo = new DateTime(2025, 12, 25),
                    OwnerId = users[0].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Madrid.jpg" },
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
                    Address = "Calle del Retiro n56",
                    City = "Madrid",
                    Country = "Spain",
                    PricePerMonth = 1500.00m,
                    NumberOfRooms = 1,
                    Bathrooms = 1,
                    SquareMeters = 40,
                    AcommodationType = AcommodationType.Room,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 6, 1),
                    AvailableTo = new DateTime(2025, 12, 31),
                    OwnerId = users[1].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/MadridSegunda.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/MadridSegunda2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/MadridSegunda3.jpg" }
                    }
                },
                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Apartamento Clasico en Barcelona",
                    Description = "Amplio apartamento con vistas a la Sagrada Familia",
                    Address = "Camí de les Vinyes 789",
                    City = "Barcelona",
                    Country = "Spain",
                    PricePerMonth = 1800.00m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    AcommodationType = AcommodationType.Apartment,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 1, 1),
                    AvailableTo = new DateTime(2025, 5, 31),
                    OwnerId = users[2].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Barcelona.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Barcelona2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Barcelona3.jpg" }
                    }
                },

                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Residencia Moderna en Barcelona",
                    Description = "Amplio apartamento remodelado con vistas a Paseig de Gracia",
                    Address = "Camí de les corts 21",
                    City = "Barcelona",
                    Country = "Spain",
                    PricePerMonth = 1800.00m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    AcommodationType = AcommodationType.Others,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 1, 1),
                    AvailableTo = new DateTime(2025, 5, 31),
                    OwnerId = users[2].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/BarcelonaSegunda.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/BarcelonaSegunda2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/BarcelonaSegunda3.jpg" }
                    }
                },

                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Casa Tradicional a las afueras de Churriana",
                    Description = "Apartamento en zona alta de churriana",
                    Address = "Calle los laureles n9",
                    City = "Malaga",
                    Country = "Spain",
                    PricePerMonth = 1800.00m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    AcommodationType = AcommodationType.Rural,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 1, 1),
                    AvailableTo = new DateTime(2025, 5, 31),
                    OwnerId = users[2].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Malaga.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Malaga2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/Malaga3.jpg" }
                    }
                },

                new Accommodation
                {
                    Id = Guid.NewGuid(),
                    Title = "Piso Costero en la Costa del Sol",
                    Description = "Apartamento en linea costera de Benalmadena",
                    Address = "Calle las Rosas n12",
                    City = "Malaga",
                    Country = "Spain",
                    PricePerMonth = 1800.00m,
                    NumberOfRooms = 3,
                    Bathrooms = 2,
                    SquareMeters = 120,
                    AcommodationType = AcommodationType.House,
                    HasWifi = true,
                    AvailableFrom = new DateTime(2025, 1, 1),
                    AvailableTo = new DateTime(2025, 5, 31),
                    OwnerId = users[2].Id,
                    AccomodationImages = new List<ImageAccommodation>
                    {
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/MalagaSegunda.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/MalagaSegunda2.jpg" },
                        new ImageAccommodation { Id = Guid.NewGuid(), Url = "accommodations/MalagaSegunda3.jpg" }
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
                Category = ForumCategory.MeetupsAndEvents,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = users[0].Id,
                Threads = new List<ForumThread>()
            };

            var forum2 = new Forum
            {
                Id = Guid.NewGuid(),
                Title = "My First Culture Shock in Germany!",
                Description = "My first days in Germany were full of surprises 🇩🇪 — from super strict punctuality (being 5 minutes late was a big deal!) to the importance of a full breakfast every morning 🥐🧀. The language barrier was tough at first, but I’m slowly learning thanks to helpful apps and friendly locals 💬😊",
                Country = "Spain",
                Category = ForumCategory.FAQ,
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

            var forumPosts = new List<Forum>
            {
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "How to apply for TIE as an Erasmus student?",
                    Description = "A guide based on my personal experience with getting the residence card in Spain.",
                    Country = "Spain",
                    Category = ForumCategory.ProceduresAndDocumentation,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[0].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "University life in Barcelona - what to expect?",
                    Description = "Sharing how my classes are structured and tips for surviving your first month.",
                    Country = "Spain",
                    Category = ForumCategory.UniversityAndAcademicLife,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[1].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "Culture shock in Germany 🇩🇪",
                    Description = "From silence on the metro to bread with every meal. What surprised you the most?",
                    Country = "Germany",
                    Category = ForumCategory.CulturalAndSocialIntegration,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[2].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "How to get an Erasmus+ scholarship top-up?",
                    Description = "Tips and links to apply for additional financial aid in Portugal.",
                    Country = "Portugal",
                    Category = ForumCategory.ScholarshipsAndFinances,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[3].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "Public transport in Prague: best student cards",
                    Description = "I compared all the options and here's what I found works best.",
                    Country = "Czech Republic",
                    Category = ForumCategory.MobilityAndTransportation,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[4].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "Best nightlife spots in Lisbon 🍻",
                    Description = "Bairro Alto or Pink Street? Share your favorite places to go out!",
                    Country = "Portugal",
                    Category = ForumCategory.LeisureTourismAndNightlife,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[5].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "June Erasmus Meetup – who’s in?",
                    Description = "Let's organize a picnic or beach day. Drop your ideas here!",
                    Country = "Spain",
                    Category = ForumCategory.MeetupsAndEvents,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[6].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "10 things I wish I packed before Erasmus",
                    Description = "Trust me, you'll thank yourself for bringing these essentials...",
                    Country = "Italy",
                    Category = ForumCategory.TipsAndExperiences,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[7].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "Can I extend my Erasmus stay?",
                    Description = "I heard it’s possible. Has anyone done it and how did it go?",
                    Country = "France",
                    Category = ForumCategory.FAQ,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[8].Id
                },
                new Forum
                {
                    Id = Guid.NewGuid(),
                    Title = "Random reflections after 2 months abroad",
                    Description = "Some thoughts about independence, growth, and unexpected lessons.",
                    Country = "Spain",
                    Category = ForumCategory.Other,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = users[9].Id
                }
            };

            _dataContext.Forum.AddRange(forumPosts);

            thread2.Posts.Add(messageA_thread2);
            thread2.Posts.Add(messageB_thread2);
            thread2.Posts.Add(messageC_thread2);
            thread2.Posts.Add(messageD_thread2);

            forum.Threads.Add(thread1);
            forum.Threads.Add(thread2);

            _dataContext.Users.AddRange(users);
            _dataContext.Recommendations.AddRange(recommendation1, recommendation2, recommendation3, recommendation4, recommendation5, recommendation6, recommendation7, recommendation8, recommendation9);
            _dataContext.Accommodations.AddRange(accommodations);
            _dataContext.Reservations.AddRange(reservations);
            _dataContext.Reviews.AddRange(reviews);
            _dataContext.Forum.Add(forum);
            await _dataContext.SaveChangesAsync();

            var specialities = new List<Speciality>
            {
                new Speciality { Id = Guid.NewGuid(), Name = "Pubs" },
                new Speciality { Id = Guid.NewGuid(), Name = "Fiesta" },
                new Speciality { Id = Guid.NewGuid(), Name = "Museums" },
                new Speciality { Id = Guid.NewGuid(), Name = "Amusement Parks" },
            };
            _dataContext.Speciality.AddRange(specialities);

            var hosts = new List<Hosts>
            {
                new Hosts
                {
                    Id          = Guid.NewGuid(),
                    UserId      = users[0].Id,
                    Reason      = "Me encanta organizar Pub Crawls, fiestas y visitas a museos",
                    CreatedAt   = DateTime.UtcNow,
                    Status      = RequestStatus.Approved,
                    HostSince   = DateTime.UtcNow,
                    UpdatedAt   = DateTime.UtcNow,
                    Specialties = new List<Speciality>
                    {
                        specialities[0],
                        specialities[1],
                        specialities[2]
                    }
                },
                new Hosts
                {
                    Id          = Guid.NewGuid(),
                    UserId      = users[1].Id,
                    Reason      = "Quiero compartir mis rutas de fiesta y parques de atracciones",
                    CreatedAt   = DateTime.UtcNow,
                    Status      = RequestStatus.Approved,
                    HostSince   = DateTime.UtcNow,
                    UpdatedAt   = DateTime.UtcNow,
                    Specialties = new List<Speciality>
                    {
                        specialities[1],
                        specialities[3]
                    }
                }
            };
            var events = new List<Event>
            {
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Encuentro Erasmus en Sevilla",
                    Date = new DateTime(2025, 06, 20, 18, 30, 0),
                    Location = "Centro Cultural de Sevilla",
                    Address = "Plaza Nueva, 1, 41001 Sevilla",
                    City ="Malaga",
                    Country ="Spain",
                    AttendeesCount = 0,
                    MaxAttendees = 50,
                    Category = "social",
                    Description = "Encuentro para estudiantes Erasmus. Habrá música, comida y visitas guiadas.",
                    ImageUrl = "events/erasmus-sevilla.jpg",
                    Tags = new List<string> { "erasmus", "intercambio", "sevilla" },
                    CreatorId = users[0].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Excursión a Montserrat",
                    Date = new DateTime(2025, 06, 22, 09, 00, 0),
                    Location = "Montserrat, Barcelona",
                    Address = "Estación Montserrat-Aeri",
                    City="Barcelona",
                    Country="Spain",
                    AttendeesCount = 0,
                    MaxAttendees = 30,
                    Category = "trip",
                    Description = "Excursión de día completo para explorar la montaña de Montserrat y su monasterio.",
                    ImageUrl = "events/trip-montserrat.jpg",
                    Tags = new List<string> { "aventura", "senderismo", "barcelona" },
                    CreatorId = users[0].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Visita al Museo Picasso",
                    Date = new DateTime(2025, 06, 25, 15, 00, 0),
                    Location = "Museu Picasso, Barcelona",
                    Address = "Carrer Montcada, 15-23, 08003 Barcelona",
                    City="Izmir",
                    Country="Turkey",
                    AttendeesCount = 0,
                    MaxAttendees = 40,
                    Category = "cultural",
                    Description = "Tour guiado por el Museo Picasso para conocer la historia y obras del artista.",
                    ImageUrl = "events/museo-picasso.jpg",
                    Tags = new List<string> { "arte", "historia", "barcelona" },
                    CreatorId = users[1].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Charla sobre oportunidades académicas en Europa",
                    Date = new DateTime(2025, 06, 27, 17, 00, 0),
                    Location = "Universitat de Barcelona",
                    Address = "Gran Via de les Corts Catalanes, 585, 08007 Barcelona",
                    City="New york",
                    Country="United States",
                    AttendeesCount = 0,
                    MaxAttendees = 100,
                    Category = "academic",
                    Description = "Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.Sesión informativa sobre becas y másters en universidades europeas.",
                    ImageUrl = "events/academic-session.jpg",
                    Tags = new List<string> { "becas", "educación", "europeo" },
                    CreatorId = users[2].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Torneo de fútbol Erasmus",
                    Date = new DateTime(2025, 07, 01, 10, 00, 0),
                    Location = "Complejo Deportivo Mar Bella",
                    Address = "Av. del Litoral, 86-96, 08005 Barcelona",
                    City="Madrid",
                    Country="Spain",
                    AttendeesCount = 0,
                    MaxAttendees = 60,
                    Category = "sports",
                    Description = "Participa o anima en nuestro torneo de fútbol entre estudiantes Erasmus.",
                    ImageUrl = "events/football-tournament.jpg",
                    Tags = new List<string> { "deporte", "fútbol", "amistad" },
                    CreatorId = users[0].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Taller de cocina española",
                    Date = new DateTime(2025, 07, 03, 18, 00, 0),
                    Location = "Kitchen Lab BCN",
                    Address = "Carrer de París, 143, 08036 Barcelona",
                    City="Barcelona",
                    Country="Spain",
                    AttendeesCount = 0,
                    MaxAttendees = 20,
                    Category = "workshop",
                    Description = "Aprende a cocinar tapas y paella como un verdadero chef español.",
                    ImageUrl = "events/cooking-workshop.jpg",
                    Tags = new List<string> { "paella", "gastronomía", "taller" },
                    CreatorId = users[1].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Fiesta en la playa Barceloneta",
                    Date = new DateTime(2025, 07, 05, 21, 00, 0),
                    Location = "Playa de la Barceloneta",
                    Address = "Passeig Marítim de la Barceloneta, 08003 Barcelona",
                    City="Barcelona",
                    Country="Spain",
                    AttendeesCount = 0,
                    MaxAttendees = 150,
                    Category = "party",
                    Description = "Música, bebidas y diversión bajo las estrellas en la playa.",
                    ImageUrl = "events/beach-party.jpg",
                    Tags = new List<string> { "playa", "música", "noche" },
                    CreatorId = users[2].Id,
                    
                },
                new Event
                {
                    Id = Guid.NewGuid(),
                    Title = "Ruta gastronómica por el Born",
                    Date = new DateTime(2025, 07, 08, 13, 00, 0),
                    Location = "Barrio del Born, Barcelona",
                    Address = "Passeig del Born, 08003 Barcelona",
                    City="Barcelona",
                    Country="Spain",
                    AttendeesCount = 0,
                    MaxAttendees = 25,
                    Category = "food",
                    Description = "Descubre los mejores sabores locales en una ruta por restaurantes auténticos.",
                    ImageUrl = "events/food-tour-born.jpg",
                    Tags = new List<string> { "tapas", "comida", "born" },
                    CreatorId = users[0].Id,
                    
                }
            };

            _dataContext.Events.AddRange(events);
            _dataContext.Hosts.AddRange(hosts);
            await _dataContext.SaveChangesAsync();

        }

    }

}