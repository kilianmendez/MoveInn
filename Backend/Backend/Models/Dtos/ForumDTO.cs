using Backend.Models.Database.Enum;

namespace Backend.Models.Dtos;

public class ForumDTO
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public ForumCategory Category { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid CreatorId { get; set; }
    public string CreatorName { get; set; } = string.Empty;
    public string CreatorAvatar { get; set; } = string.Empty;
}

public class CreateForumDTO
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public ForumCategory Category { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid CreatorId { get; set; }
}
