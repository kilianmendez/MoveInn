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

        if (accommodationDto.Images != null && accommodationDto.Images.Any())
        {
            if (accommodationDto.Images.Count > 5)
            {
                throw new Exception("Solo se permiten hasta 5 imágenes por alojamiento.");
            }

            foreach (var file in accommodationDto.Images)
            {
                string imageUrl = await StoreImageAsync(file, accommodationDto.Title);
                var image = new ImageAccommodation
                {
                    Id = Guid.NewGuid(),
                    Url = imageUrl,
                    AccommodationId = accommodation.Id
                };
                _context.Set<ImageAccommodation>().Add(image);
            }

            await _context.SaveChangesAsync(); // Anteriormente línea 35
        }

        return AccommodationMapper.ToDto(accommodation);
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
                OwnerId = a.OwnerId,
                AvailableFrom = a.AvailableFrom,
                AvailableTo = a.AvailableTo
            })
            .ToListAsync();
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
