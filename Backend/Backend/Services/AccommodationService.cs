using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class AccommodationService : IAccommodationService
{
    private readonly IAccommodationRepository _repository;
    private readonly DataContext _context;

    public AccommodationService(IAccommodationRepository repository, DataContext context)
    {
        _repository = repository;
        _context = context;
    }

    public async Task<Accommodation> CreateAccommodationAsync(Accommodation accommodation)
    {
        accommodation.Id = Guid.NewGuid();

        await _repository.InsertAsync(accommodation);
        await _context.SaveChangesAsync();

        return accommodation;
    }

    public async Task<IEnumerable<AccommodationDTO>> GetAllAccommodationsAsync()
    {
        return await _context.Accommodations
            .Select(a => new AccommodationDTO
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                Address = a.Address,
                City = a.City,
                Country = a.Country,
                PricePerMonth = a.PricePerMonth,
                NumberOfRooms = a.NumberOfRooms,
                Bathrooms = a.Bathrooms,
                SquareMeters = a.SquareMeters,
                HasWifi = a.HasWifi,
                OwnerId = a.OwnerId
            })
            .ToListAsync();
    }
}
