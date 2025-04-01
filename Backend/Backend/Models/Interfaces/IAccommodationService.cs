using Backend.Models.Database.Entities;
using Backend.Models.Dtos;

namespace Backend.Models.Interfaces;

public interface IAccommodationService
{
    Task<Accommodation> CreateAccommodationAsync(Accommodation accommodation);
    Task<IEnumerable<AccommodationDTO>> GetAllAccommodationsAsync();
}
