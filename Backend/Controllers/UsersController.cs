using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Utils;
using Backend.Constants;
namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Ensure all endpoints require authorization by default
    public class UsersController(AppDbContext dbContext) : ControllerBase
    {
        private readonly AppDbContext _dbContext = dbContext;
        [HttpGet]
        [Authorize] // Only allow ADMINs to access this endpoint
        public async Task<IActionResult> GetAllUsers()
        {
            var userId = AuthUtils.GetUserIdFromToken(HttpContext);
            var userRole = AuthUtils.GetUserRole(HttpContext);

            // Start with all tasks for admins; filter by assigned user for regular users
            var query = userRole == UserRole.ADMIN
                ? _dbContext.Users.AsQueryable()
                : _dbContext.Users.Where(t => t.Id == userId);
            // Fetch users and project only required fields
            var users = await query
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
