using Backend.Models.Database.Enum;

namespace Backend.Models.Dtos
{
    public class RecommendationDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public Category? Category { get; set; }
        public string? Location { get; set; }
        public Rating? Rating { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
