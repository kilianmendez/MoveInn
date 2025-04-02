using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Models.Database.Enum;

namespace Backend.Models.Database.Entities
{
    public class Recommendation
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public Category? Category { get; set; }

        public string? Location { get; set; }


        public Rating? Rating { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Image> RecommendationImages { get; set; } = new List<Image>();

        [ForeignKey("UserId")]
        public Guid? UserId { get; set; }
        public User? User { get; set; }


    }
}
