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

    [HttpPost]
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

    [HttpGet]
    public async Task<IActionResult> GetAllForums()
    {
        IEnumerable<ForumDTO> forums = await _forumService.GetAllForumsAsync();
        return Ok(forums);
    }
}
