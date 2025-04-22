using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Interfaces;
using Backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccommodationsController : ControllerBase
{
    private readonly IAccommodationService _accommodationService;
    private readonly SmartSearchService _smartSearchService;
    private readonly DataContext _contex;

    public AccommodationsController(IAccommodationService accommodationService, DataContext context, SmartSearchService smartSearchService)
    {
        _accommodationService = accommodationService;
        _smartSearchService = smartSearchService;
        _contex = context;
    }

    [HttpPost("CreateAccommodation")]
    public async Task<IActionResult> CreateAccommodation([FromForm] AccommodationCreateDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var userExists = await _contex.Users.AnyAsync(u => u.Id == dto.OwnerId);
            if (!userExists)
            {
                return BadRequest(new { message = "El usuario especificado no existe." });
            }

            var createdAccommodation = await _accommodationService.CreateAccommodationAsync(dto);
            return Ok(new { message = "Alojamiento registrado correctamente." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Hubo un problema al crear el alojamiento.",
                error = ex.Message,
                inner = ex.InnerException?.Message,
                trace = ex.StackTrace
            });
        }
    }

    [HttpPost("SearchAccommodation")]
    public async Task<IActionResult> Search([FromBody] SearchAccommodationDTO request)
    {
        if (request.Page < 1 || request.Limit < 1)
        {
            return BadRequest("La página y el límite deben ser mayores que 0.");
        }
        try
        {
            var accommodations = string.IsNullOrWhiteSpace(request.Query)
                ? await _accommodationService.GetAllAccommodationsAsync()
                : await _smartSearchService.SearchAccommodationAsync(request.Query);

            if (accommodations == null || !accommodations.Any())
            {
                return NotFound("No accommodations found.");
            }

            if (request.AvailableFrom.HasValue)
            {
                var from = request.AvailableFrom.Value.Date;
                accommodations = accommodations
                    .Where(a =>
                        a.AvailableFrom != default &&
                        a.AvailableFrom.Date <= from &&
                        a.AvailableTo != default &&
                        a.AvailableTo.Date >= from
                    )
                    .ToList();
            }

            if (request.AvailableTo.HasValue)
            {
                var to = request.AvailableTo.Value.Date;
                accommodations = accommodations
                    .Where(a =>
                        a.AvailableFrom != default &&
                        a.AvailableFrom.Date <= to &&
                        a.AvailableTo != default &&
                        a.AvailableTo.Date >= to
                    )
                    .ToList();
            }

            if (!string.IsNullOrWhiteSpace(request.Country))
            {
                accommodations = accommodations
                    .Where(a => a.Country != null &&
                                a.Country.Equals(request.Country, StringComparison.OrdinalIgnoreCase))
                    .ToList();
            }

            if (request.SortField?.ToLower() == "price")
            {
                accommodations = request.SortOrder?.ToLower() == "asc"
                    ? accommodations.OrderBy(p => p.PricePerMonth).ToList()
                    : accommodations.OrderByDescending(p => p.PricePerMonth).ToList();
            }
            else if (request.SortField?.ToLower() == "name")
            {
                accommodations = request.SortOrder?.ToLower() == "asc"
                    ? accommodations.OrderBy(p => p.Title).ToList()
                    : accommodations.OrderByDescending(p => p.Title).ToList();
            }

            var totalItems = accommodations.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)request.Limit);

            var paginatedProducts = accommodations
                .Skip((request.Page - 1) * request.Limit)
                .Take(request.Limit)
                .ToList();

            var result = new
            {
                currentPage = request.Page,
                totalPages,
                totalItems,
                items = paginatedProducts
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccommodation(Guid id)
    {
        var accomodation = await _accommodationService.GetByIdAsync(id);
        return Ok(accomodation);
    }

    [HttpGet("allAccommodations")]
    public async Task<IActionResult> GetAccommodations()
    {
        var accommodations = await _accommodationService.GetAllAccommodationsAsync();
        return Ok(accommodations);
    }

    [HttpGet("countries")]
    public async Task<IActionResult> GetCountries()
    {
        var countries = await _accommodationService.GetAllCountriesAsync();
        return Ok(countries);
    }

    [HttpGet("cities/{country}")]
    public async Task<IActionResult> GetCitiesByCountry(string country)
    {
        var cities = await _accommodationService.GetCitiesByCountryAsync(country);
        return Ok(cities);
    }

    
}
