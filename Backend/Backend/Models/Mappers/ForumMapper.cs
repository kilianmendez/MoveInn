using Backend.Models.Database.Entities;
using Backend.Models.Dtos;

namespace Backend.Models.Mappers;

public class ForumMapper
{

    public static Forum ToEntity(CreateForumDTO dto)
    {
        if (dto == null) return null!;

        return new Forum
        {
            Id = Guid.NewGuid(),
            Title = dto.Title,
            Description = dto.Description,
            Country = dto.Country,
            Category = dto.Category,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = dto.CreatorId
        };
    }

    public static ForumDTO ToDto(Forum forum)
    {
        if (forum == null) return null!;

        return new ForumDTO
        {
            Id = forum.Id,
            Title = forum.Title,
            Description = forum.Description,
            Country = forum.Country,
            Category = forum.Category,
            CreatedAt = forum.CreatedAt,
            CreatorId = forum.CreatedBy,
            CreatorName = "Nombre del Usuario",
            CreatorAvatar = "URL del Avatar"
        };
    }
}
