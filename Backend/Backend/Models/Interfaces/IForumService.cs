using Backend.Models.Database.Entities;
using Backend.Models.Dtos;

namespace Backend.Models.Interfaces;

public interface IForumService
{
    Task<bool> CreateForumAsync(CreateForumDTO forum);
    Task<IEnumerable<ForumDTO>> GetAllForumsAsync();
}
