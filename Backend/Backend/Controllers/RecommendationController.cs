using Backend.Models.Dtos;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        private readonly RecommendationService _recommendationService;

        public RecommendationController(RecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        [HttpPost]
        public async Task<ActionResult<RecommendationDto>> CreateRecommendation([FromBody] RecommendationCreateRequest request)
        {
            // Obtener el id del usuario de los claims (opcional)
            Guid? userId = null;
            var userClaim = User.FindFirst("id");
            if (userClaim != null && Guid.TryParse(userClaim.Value, out Guid parsedUserId))
            {
                userId = parsedUserId;
            }

            var result = await _recommendationService.CreateRecommendationAsync(request, userId);
            if (result == null)
                return StatusCode(500, "No se pudo crear la recomendación.");

            return CreatedAtAction(nameof(GetRecommendationById), new { id = result.Id }, result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RecommendationDto>> GetRecommendationById(Guid id)
        {
            var recommendation = await _recommendationService.GetRecommendationByIdAsync(id);
            if (recommendation == null)
                return NotFound();
            return Ok(recommendation);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecommendationDto>>> GetAllRecommendations()
        {
            var recommendations = await _recommendationService.GetAllRecommendationsAsync();
            return Ok(recommendations);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<RecommendationDto>> UpdateRecommendation(Guid id, [FromBody] RecommendationUpdateRequest request)
        {
            var updated = await _recommendationService.UpdateRecommendationAsync(id, request);
            if (updated == null)
                return NotFound("Recomendación no encontrada o no se pudo actualizar.");
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRecommendation(Guid id)
        {
            bool deleted = await _recommendationService.DeleteRecommendationAsync(id);
            if (!deleted)
                return NotFound("Recomendación no encontrada.");
            return NoContent();
        }
    }
}
