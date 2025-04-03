using Backend.Models.Database.Entities;
using Backend.Models.Dtos;

namespace Backend.Models.Mappers;

public class AccommodationMapper
{
    public static AccommodationDTO ToDto(Accommodation accommodation)
    {
        if (accommodation == null) return null;

        return new AccommodationDTO
        {
            Id = accommodation.Id,
            Title = accommodation.Title,
            Description = accommodation.Description,
            Address = accommodation.Address,
            City = accommodation.City,
            Country = accommodation.Country,
            PricePerMonth = accommodation.PricePerMonth,
            NumberOfRooms = accommodation.NumberOfRooms,
            Bathrooms = accommodation.Bathrooms,
            SquareMeters = accommodation.SquareMeters,
            HasWifi = accommodation.HasWifi,
            OwnerId = accommodation.OwnerId,
            AvailableFrom = accommodation.AvailableFrom,
            AvailableTo = accommodation.AvailableTo
        };
    }

    public static Accommodation ToEntity(AccommodationCreateDTO accommodation)
    {
        return new Accommodation
        {
            Id = Guid.NewGuid(),
            Title = accommodation.Title,
            Description = accommodation.Description,
            Address = accommodation.Address,
            City = accommodation.City,
            Country = accommodation.Country,
            PricePerMonth = accommodation.PricePerMonth,
            NumberOfRooms = accommodation.NumberOfRooms,
            Bathrooms = accommodation.Bathrooms,
            SquareMeters = accommodation.SquareMeters,
            HasWifi = accommodation.HasWifi,
            OwnerId = accommodation.OwnerId,
            AvailableFrom = accommodation.AvailableFrom,
            AvailableTo = accommodation.AvailableTo
        };
    }
}
