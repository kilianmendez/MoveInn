using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Database.Entities;

public class ForumMessages
{
    [Key]
    public Guid Id { get; set; }
    public Guid ThreadId { get; set; }
    public string Content { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public Guid CreatedBy { get; set; }

    public ForumThread Thread { get; set; } = null!;
}
