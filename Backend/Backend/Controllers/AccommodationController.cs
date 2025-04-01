using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccommodationsController : ControllerBase
{
    private readonly IAccommodationService _accommodationService;

    public AccommodationsController(IAccommodationService accommodationService)
    {
        _accommodationService = accommodationService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAccommodation([FromBody] AccommodationCreateDTO dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var accommodation = new Accommodation
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Description = dto.Description,
                Address = dto.Address,
                City = dto.City,
                Country = dto.Country,
                PricePerMonth = dto.PricePerMonth,
                NumberOfRooms = dto.NumberOfRooms,
                Bathrooms = dto.Bathrooms,
                SquareMeters = dto.SquareMeters,
                HasWifi = dto.HasWifi,
                OwnerId = dto.OwnerId
            };

            var createdAccommodation = await _accommodationService.CreateAccommodationAsync(accommodation);
            return Ok(new { message = "Alojamiento registrado correctamente." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                message = "Hubo un problema al crear el alojamiento.",
                error = ex.Message,
                trace = ex.StackTrace
            });
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAccommodation(Guid id)
    {
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAccommodations()
    {
        var accommodations = await _accommodationService.GetAllAccommodationsAsync();
        return Ok(accommodations);
    }
}
