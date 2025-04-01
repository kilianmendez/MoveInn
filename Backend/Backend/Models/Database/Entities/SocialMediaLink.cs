using System.ComponentModel.DataAnnotations;
using Backend.Models.Database.Enum;

namespace Backend.Models.Database.Entities
{
    public class SocialMediaLink
    {
        [Key]
        public int Id { get; set; }
        public SocialMedia SocialMedia { get; set; }
        public string Url { get; set; }
    }
}
