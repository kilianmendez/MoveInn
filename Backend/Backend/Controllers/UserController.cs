using System.Security.Claims;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }


        //[Authorize(Roles = "admin")]
        [HttpGet("Get_Users")]
        public async Task<ActionResult> GetAllAsync()
        {
            //Claim userClaimId = User.FindFirst("id");
            //if (userClaimId == null) return Unauthorized(new { Message = "Debe iniciar sesión para llevar a cabo esta acción" });

            return Ok(await _userService.GetAllAsync());
        }
    }
}
