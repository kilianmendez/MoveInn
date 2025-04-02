using Backend.Models.Database.Enum;
using Backend.Models.Dtos;
using Backend.Services;
using Backend.Services.Search;
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
        private readonly SmartSearchRecommendationService _smartSearch;

        public RecommendationController(RecommendationService recommendationService,SmartSearchRecommendationService smartSearch)
        {
            _recommendationService = recommendationService;
            _smartSearch = smartSearch;
        }

        [HttpPost("CreateRecommendation")]
        public async Task<IActionResult> CreateRecommendation([FromForm] RecommendationCreateRequest request)
        {
            Guid? userId = null;
            var userClaim = User.FindFirst("id");
            if (userClaim != null && Guid.TryParse(userClaim.Value, out Guid parsedUserId))
            {
                userId = parsedUserId;
            }

            var result = await _recommendationService.CreateRecommendationAsync(request, userId);
            if (result == null)
                return StatusCode(500, "Error al crear la recomendación.");
            return Ok(result);
        }

        [HttpGet("GetRecommendationById/{id}")]
        public async Task<IActionResult> GetRecommendationById(Guid id)
        {
            var recommendation = await _recommendationService.GetRecommendationByIdAsync(id);
            if (recommendation == null)
                return NotFound("Recomendación no encontrada.");
            return Ok(recommendation);
        }

        [HttpGet("GetAllRecommendations")]
        public async Task<IActionResult> GetAllRecommendations()
        {
            var recommendations = await _recommendationService.GetAllRecommendationsAsync();
            return Ok(recommendations);
        }

        [HttpGet("SortByRating")]
        public async Task<ActionResult<IEnumerable<RecommendationDto>>> GetRecommendationsSortedByRating([FromQuery] bool order)
        {
            //True = ascendente, False = descendente
            var result = await _recommendationService.GetRecommendationsSortedByRatingAsync(order);
            return Ok(result);
        }

        [HttpGet("ByCategory")]
        public async Task<ActionResult<IEnumerable<RecommendationDto>>> GetRecommendationsByCategory([FromQuery] Category category)
        {
            var result = await _recommendationService.GetRecommendationsByCategoryAsync(category);
            return Ok(result);
        }

        [HttpGet("Search")]
        public async Task<IActionResult> SearchRecommendations([FromQuery] string query)
        {
            var result = await _smartSearch.SearchRecommendationsAsync(query);
            return Ok(result);
        }

        [HttpPut("UpdateRecommendation/{id}")]
        public async Task<IActionResult> UpdateRecommendation(Guid id, [FromForm] RecommendationUpdateRequest request)
        {
            var updated = await _recommendationService.UpdateRecommendationAsync(id, request);
            if (updated == null)
                return NotFound("Recomendación no encontrada o no se pudo actualizar.");
            return Ok(updated);
        }

        [HttpDelete("DeleteRecommendation/{id}")]
        public async Task<IActionResult> DeleteRecommendation(Guid id)
        {
            bool deleted = await _recommendationService.DeleteRecommendationAsync(id);
            if (!deleted)
                return NotFound("Recomendación no encontrada.");
            return Ok("Recomendación eliminada.");
        }


    }
}
