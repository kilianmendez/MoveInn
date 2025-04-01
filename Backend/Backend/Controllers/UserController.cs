using System.Security.Claims;
using Backend.Models.Database.Entities;
using Backend.Models.Database.Enum;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserByIdAsync(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { Message = "Usuario no encontrado" });
            }
            return Ok(user);
        }

        [Authorize(Roles = nameof(Role.Administrator))]
        [HttpDelete("Delete")]
        public async Task<ActionResult<User>> DeleteUserByIdAsync(Guid id)
        {
            var user = await _userService.DeleteAsyncUserById(id);
            if (user == null)
            {
                return NotFound(new { Message = "Usuario no encontrado" });
            }
            return Ok(user);
        }
        //[HttpPut("Update")]
        //public async Task<ActionResult<User>> UpdateUserAsync(User user)
        //{
        //    var updatedUser = await _userService.UpdateAsync(user);
        //    if (updatedUser == null)
        //    {
        //        return NotFound(new { Message = "Usuario no encontrado" });
        //    }
        //    return Ok(updatedUser);
        //}

        [Authorize(Roles = nameof(Role.Administrator))]
        [HttpGet("All")]
        public async Task<ActionResult> GetAllAsync()
        {
            Claim? userClaimId = User.FindFirst("id");
            if (userClaimId == null) return Unauthorized(new { Message = "Debe iniciar sesión para llevar a cabo esta acción" });

            return Ok(await _userService.GetAllAsync());
        }
    }
}
