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
            var forumDto = ForumMapper.ToDto(forum);
            var user = await _unitOfWork.UserRepository.GetUserDataByIdAsync(forum.CreatedBy);

            if (user != null)
            {
                forumDto.CreatorId = user.Id;
                forumDto.CreatorName = user.Name;
                forumDto.CreatorAvatar = user.AvatarUrl;
            }
            else
            {
                forumDto.CreatorName = "Usuario desconocido";
                forumDto.CreatorAvatar = "default-avatar.png";
            }

            forumDTOs.Add(forumDto);
        }

        return forumDTOs;
    }

    public async Task<bool> CreateThreadAsync(CreateForumThreadDTO threadDto)
    {
        try
        {
            ForumThread threadEntity = ForumMapper.ToEntity(threadDto);
            await _unitOfWork.ForumRepository.CreateThreadAsync(threadEntity);
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al crear el hilo", ex);
        }
    }

    public async Task<IEnumerable<ForumThreadDTO>> GetThreadsByForumIdAsync(Guid forumId)
    {
        var threads = await _unitOfWork.ForumRepository.GetThreadsByForumIdAsync(forumId);
        var threadDtos = threads.Select(thread => ForumMapper.ToDto(thread)).ToList();
        return threadDtos;
    }

    public async Task<bool> CreateMessageAsync(CreateForumMessageDTO messageDto)
    {
        try
        {
            ForumMessages messageEntity = ForumMapper.ToEntity(messageDto);
            await _unitOfWork.ForumRepository.CreateMessageAsync(messageEntity);
            return true;
        }
        catch (Exception ex)
        {
            throw new Exception("Error al crear el mensaje", ex);
        }
    }

    public async Task<IEnumerable<ForumMessageDTO>> GetMessagesByThreadIdAsync(Guid threadId)
    {
        var messages = await _unitOfWork.ForumRepository.GetMessagesByThreadIdAsync(threadId);
        var messageDtos = messages.Select(ForumMapper.ToDto).ToList();
        return messageDtos;
    }

}

