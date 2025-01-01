using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Utils;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Ensure all endpoints require authorization by default
    public class UsersController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;
        [HttpGet]
        [Authorize(Roles = "ADMIN")] // Only allow ADMINs to access this endpoint
        public async Task<IActionResult> GetAllUsers()
        {
            // Fetch users and project only required fields
            var users = await _dbContext.Users
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email
                })
                .ToListAsync();

            return Ok(users);
        }
    }
}
