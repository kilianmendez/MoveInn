using Backend.Models.Database.Entities;

namespace Backend.Models.Interfaces;

public interface IForumRepository
{
    Task CreateReviewAsync(Forum forum);
    Task<IEnumerable<Forum>> GetAllForumsAsync();
}
