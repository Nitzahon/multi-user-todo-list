using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Backend.Constants;
using Backend.Data;
using Backend.Models;
using System.Security.Claims;

namespace Backend.Utils
{
    public static class AuthUtils
    {
        /// <summary>
        /// Extracts the user ID from the token in the HTTP context.
        /// </summary>
        /// <param name="httpContext">The HTTP context.</param>
        /// <returns>The user ID as a Guid.</returns>
        /// <exception cref="UnauthorizedAccessException">Thrown if the user ID is not found in the token.</exception>
        public static Guid GetUserIdFromToken(HttpContext httpContext)
        {
            
            var userIdClaim = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier) ?? throw new UnauthorizedAccessException("User ID not found in token.");
            return Guid.Parse(userIdClaim.Value);
        }

        /// <summary>
        /// Asynchronously retrieves a user by their ID from the database.
        /// </summary>
        /// <param name="dbContext">The application's database context.</param>
        /// <param name="userId">The ID of the user to retrieve.</param>
        /// <returns>The user object.</returns>
        /// <exception cref="InvalidOperationException">Thrown if the user is not found.</exception>
        public static async Task<User> GetUserByIdAsync(AppDbContext dbContext, Guid userId)
        {
            var user = await dbContext.Users.FindAsync(userId) ?? throw new InvalidOperationException($"User with ID {userId} not found.");
            return user;
        }

        public static string GetUserRole(HttpContext httpContext)
        {
            var role = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role) ?? throw new UnauthorizedAccessException("User role not found in token.");
            return role.Value;
        }
    }
}
