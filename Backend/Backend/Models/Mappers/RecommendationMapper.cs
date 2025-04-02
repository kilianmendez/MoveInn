using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Database.Enum;

namespace Backend.Models.Mappers
{
    public static class RecommendationMapper
    {
        public static RecommendationDto ToDto(Recommendation recommendation)
        {
            if (recommendation == null) return null;

            return new RecommendationDto
            {
                Id = recommendation.Id,
                Title = recommendation.Title,
                Description = recommendation.Description,
                Category = recommendation.Category,
                Location = recommendation.Location,
                Rating = recommendation.Rating,
                CreatedAt = recommendation.CreatedAt
            };
        }

        public static Recommendation ToEntity(RecommendationCreateRequest request)
        {
            return new Recommendation
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Location = request.Location,
                Rating = request.Rating,
                CreatedAt = DateTime.UtcNow
            };
        }

        public static void UpdateEntity(Recommendation recommendation, RecommendationUpdateRequest request)
        {
            if (request.Title != null)
                recommendation.Title = request.Title;
            if (request.Description != null)
                recommendation.Description = request.Description;
            if (request.Category != null)
                recommendation.Category = request.Category;
            if (request.Location != null)
                recommendation.Location = request.Location;
            if (request.Rating.HasValue)
                recommendation.Rating = request.Rating;
        }
    }
}
