using Backend.Models.Database.Entities;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models.Database.Repositories;

public class AccommodationRepository : IAccommodationRepository
{
    private readonly DataContext _context;
    public AccommodationRepository(DataContext context)
    {
        _context = context;
    }

    public async Task InsertAsync(Accommodation accommodation)
    {
        await _context.Accommodations.AddAsync(accommodation);
    }
    public async Task<IEnumerable<Accommodation>> GetAllAsync()
    {
        return await _context.Accommodations.Include(a => a.Owner).ToListAsync();
    }
}
