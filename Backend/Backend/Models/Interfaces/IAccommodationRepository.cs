using Backend.Models.Database.Entities;

namespace Backend.Models.Interfaces;

public interface IAccommodationRepository
{
    Task InsertAsync(Accommodation accommodation);
    Task<IEnumerable<Accommodation>> GetAllAsync();

}
