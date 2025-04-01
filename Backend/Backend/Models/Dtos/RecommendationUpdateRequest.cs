using Backend.Models.Database.Enum;

namespace Backend.Models.Dtos
{
    public class RecommendationUpdateRequest
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Category? Category { get; set; }
        public string? Location { get; set; }
        public Rating? Rating { get; set; }
    }
}
