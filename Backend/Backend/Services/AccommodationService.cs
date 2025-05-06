using Backend.Models.Database;
using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Interfaces;
using Backend.Models.Mappers;
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
    public async Task<Accommodation> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }
    public async Task<IEnumerable<DateTime>> GetUnavailableDatesAsync(Guid accommodationId)
    {
        var reservations = await _context.Reservations
            .Where(r => r.AccommodationId == accommodationId
                     && r.Status != Models.Database.Enum.ReservationStatus.Cancelled)
            .ToListAsync();

        var blocked = new SortedSet<DateTime>();
        foreach (var res in reservations)
        {
            var day = res.StartDate.Date;
            var end = res.EndDate.Date;
            while (day < end)
            {
                blocked.Add(day);
                day = day.AddDays(1);
            }
        }

        return blocked;
    }
    public async Task<AccommodationDTO> CreateAccommodationAsync(AccommodationCreateDTO accommodationDto)
    {
        var userExists = await _context.Users.AnyAsync(u => u.Id == accommodationDto.OwnerId);
        if (!userExists)
        {
            throw new Exception("El usuario especificado (OwnerId) no existe en la base de datos.");
        }

        var accommodation = AccommodationMapper.ToEntity(accommodationDto);
        accommodation.Id = Guid.NewGuid();

        await _repository.InsertAsync(accommodation);
        await _context.SaveChangesAsync();

        if (accommodationDto.AccomodationImages != null && accommodationDto.AccomodationImages.Any())
        {
            if (accommodationDto.AccomodationImages.Count > 5)
            {
                throw new Exception("Solo se permiten hasta 5 imágenes por alojamiento.");
            }

            foreach (var file in accommodationDto.AccomodationImages)
            {
                string imageUrl = await StoreImageAsync((IFormFile)file, accommodationDto.Title);
                var image = new ImageAccommodation
                {
                    Id = Guid.NewGuid(),
                    Url = imageUrl,
                };
                _context.Set<ImageAccommodation>().Add(image);
            }

            await _context.SaveChangesAsync(); 
        }

        return AccommodationMapper.ToDto(accommodation);
    }

    public async Task<IEnumerable<AccommodationDTO>> GetAllAccommodationsAsync()
    {
        var list = await _context.Accommodations
            .Include(a => a.AccomodationImages)
            .ToListAsync();

        return list.Select(AccommodationMapper.ToDto);
    }

    public async Task<string> StoreImageAsync(IFormFile file, string fileNamePrefix)
    {
        var validImageTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/webp" };
        if (!validImageTypes.Contains(file.ContentType))
        {
            throw new ArgumentException("El archivo no es un formato de imagen válido.");
        }

        string fileExtension = Path.GetExtension(file.FileName);
        string fileName = $"{fileNamePrefix}_{Guid.NewGuid()}{fileExtension}";
        string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "accommodations");
        if (!Directory.Exists(folderPath))
        {
            Directory.CreateDirectory(folderPath);
        }
        string filePath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Path.Combine("accommodations", fileName).Replace("\\", "/");
    }

    public async Task<IEnumerable<string>> GetAllCountriesAsync()
    {
        return await _repository.GetAllCountriesAsync();
    }

    public async Task<IEnumerable<string>> GetCitiesByCountryAsync(string country)
    {
        return await _repository.GetCitiesByCountryAsync(country);
    }
}
