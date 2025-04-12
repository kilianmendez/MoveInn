using Backend.Models.Database;
using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Interfaces;
using Backend.Models.Mappers;

namespace Backend.Services;

public class ForumService : IForumService
{
    private readonly UnitOfWork _unitOfWork;
    public ForumService(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> CreateForumAsync(CreateForumDTO forumDto)
    {
        try
        {
            var forumEntity = ForumMapper.ToEntity(forumDto);
            await _unitOfWork.ForumRepository.CreateReviewAsync(forumEntity);
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al crear el Foro", ex);
        }
    }

    public async Task<IEnumerable<ForumDTO>> GetAllForumsAsync()
    {
        var forums = await _unitOfWork.ForumRepository.GetAllForumsAsync();
        var forumDTOs = new List<ForumDTO>();

        foreach (var forum in forums)
        {
            var user = await _unitOfWork.UserRepository.GetUserDataByIdAsync(forum.CreatedBy);

            forumDTOs.Add(new ForumDTO
            {
                Id = forum.Id,
                Title = forum.Title,
                Description = forum.Description,
                Country = forum.Country,
                Category = forum.Category,
                CreatedAt = forum.CreatedAt,
                CreatorId = user.Id,
                CreatorName = user.Name,
                CreatorAvatar = user.AvatarUrl
            });
        }

        return forumDTOs;
    }
}

