using Backend.Models.Database.Entities;
using Backend.Models.Dtos;
using Backend.Models.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ForumController : ControllerBase
{
    private readonly IForumService _forumService;

    public ForumController(IForumService forumService)
    {
        _forumService = forumService;
    }

    [HttpPost("forum")]
    public async Task<IActionResult> CreateForum([FromBody] CreateForumDTO forum)
    {
        if (forum == null)
        {
            return BadRequest(new { message = "Los datos del foro no pueden ser nulos." });
        }

        bool creado = await _forumService.CreateForumAsync(forum);

        if (creado)
        {
            return Ok(new { message = "Foro creado correctamente." });
        }

        return StatusCode(500, "Ocurrió un error al crear el foro.");
    }

    [HttpGet("forum")]
    public async Task<IActionResult> GetAllForums()
    {
        IEnumerable<ForumDTO> forums = await _forumService.GetAllForumsAsync();
        return Ok(forums);
    }

    [HttpPost("thread")]
    public async Task<IActionResult> CreateThread([FromBody] CreateForumThreadDTO threadDto)
    {
        if (threadDto == null)
        {
            return BadRequest(new { message = "Los datos del hilo son requeridos." });
        }

        bool creado = await _forumService.CreateThreadAsync(threadDto);

        if (creado)
        {
            return Ok(new { message = "Hilo creado correctamente." });
        }

        return StatusCode(500, new { message = "Ocurrió un error al crear el hilo." });
    }

    [HttpGet("thread/forum/{forumId}")]
    public async Task<IActionResult> GetThreadsByForum([FromRoute] Guid forumId)
    {
        var threads = await _forumService.GetThreadsByForumIdAsync(forumId);
        return Ok(threads);
    }

    [HttpPost("createMessageInThread")]
    public async Task<IActionResult> CreateMessage([FromBody] CreateForumMessageDTO messageDto)
    {
        if (messageDto == null)
        {
            return BadRequest(new { message = "Los datos del mensaje son requeridos." });
        }

        bool creado = await _forumService.CreateMessageAsync(messageDto);

        if (creado)
        {
            return Ok(new { message = "Mensaje creado correctamente." });
        }

        return StatusCode(500, new { message = "Ocurrió un error al crear el mensaje." });
    }

    [HttpGet("message/thread/{threadId}")]
    public async Task<IActionResult> GetMessagesByThread([FromRoute] Guid threadId)
    {
        var messages = await _forumService.GetMessagesByThreadIdAsync(threadId);
        return Ok(messages);
    }
}
