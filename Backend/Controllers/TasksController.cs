using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.DTOs;
using System.IdentityModel.Tokens.Jwt;
using Backend.Models;
using Backend.Constants;
using TaskStatus = Backend.Constants.TaskStatus;
using System.Security.Claims;


namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetTasks([FromQuery] string status, [FromQuery] Guid? assignedUserId)
        {
            var query = _context.Tasks.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            if (assignedUserId.HasValue)
                query = query.Where(t => t.AssignedUserId == assignedUserId.Value);

            var tasks = await query.ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN, USER")]
        public async Task<IActionResult> CreateTask([FromBody] TaskDTO taskDTO)
        {

            var changedByUserId = GetUserIdFromToken();
            var userRole = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "role")?.Value;

            Guid assignedUserId;

            if (userRole == "ADMIN")
            {
                // Admin can assign to any user
                if (!await _context.Users.AnyAsync(u => u.Id == taskDTO.AssignedUserId))
                {
                    return BadRequest("Assigned user does not exist.");
                }
                assignedUserId = taskDTO.AssignedUserId;
            }
            else
            {
                // Non-admin users can only assign tasks to themselves
                assignedUserId = changedByUserId;
            }
            // Extract the user ID from the token

            // Retrieve the user from the database
            var changedByUser = await GetUserByIdAsync(changedByUserId);
            if (changedByUser == null) return Unauthorized("User not found.");

            var task = new Models.Task
            {
                Id = Guid.NewGuid(),
                Title = taskDTO.Title,
                Description = taskDTO.Description,
                Status = TaskStatus.TODO,
                AssignedUserId = taskDTO.AssignedUserId,
                CreatedDate = DateTime.UtcNow
            };

            _context.Tasks.Add(task);

            AddTaskHistory(task, changedByUserId, changedByUser, ChangeType.TaskCreated);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN, USER")]
        public async Task<IActionResult> UpdateTask(Guid id, [FromBody] TaskDTO taskDTO)
        {
            var changedByUserId = GetUserIdFromToken();
            var userRole = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "role")?.Value;

            if (!await _context.Users.AnyAsync(u => u.Id == taskDTO.AssignedUserId))
            {
                return BadRequest("Assigned user does not exist.");
            }

            // Retrieve the user from the database
            var changedByUser = await GetUserByIdAsync(changedByUserId);
            if (changedByUser == null) return Unauthorized("User not found.");

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            var properties = typeof(TaskDTO).GetProperties();
            foreach (var property in properties)
            {
                if (property.Name == nameof(task.AssignedUserId) && userRole != UserRole.ADMIN)
                {
                    continue;
                }
                // Get the value from the taskDTO
                var newValue = property.GetValue(taskDTO);

                // Get the corresponding property in the Task model
                var taskProperty = typeof(Models.Task).GetProperty(property.Name);
                if (taskProperty == null) continue; // Skip if no matching property

                // Get the current value from the task
                var currentValue = taskProperty.GetValue(task);

                // Compare values
                if (!Equals(currentValue, newValue))
                {
                    // Update the task property
                    taskProperty.SetValue(task, newValue);
                    var changeType = ChangeType.PropertyToChangeTypeMap[property.Name];
                    // Log the change
                    AddTaskHistory(task, changedByUserId, changedByUser, changeType);
                }
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var changedByUserId = GetUserIdFromToken();

            // Retrieve the user from the database
            var changedByUser = await GetUserByIdAsync(changedByUserId);
            if (changedByUser == null) return Unauthorized("User not found.");

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            AddTaskHistory(task, changedByUserId, changedByUser, ChangeType.TaskDeleted);

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private Guid GetUserIdFromToken()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier) ?? throw new UnauthorizedAccessException("User ID not found in token.");
            return Guid.Parse(userIdClaim.Value);
        }

        private async Task<User?> GetUserByIdAsync(Guid userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        private void AddTaskHistory(Models.Task task, Guid userId, User user, string changeType)
        {
            if (!ChangeType.All.Contains(changeType))
            {
                throw new ArgumentException($"Invalid ChangeType: {changeType}");
            }
            var history = new TaskHistory
            {
                Id = Guid.NewGuid(),
                TaskId = task.Id,
                Task = task,
                ChangeDate = DateTime.UtcNow,
                ChangedByUserId = userId,
                ChangedByUser = user,
                ChangeType = changeType,
            };

            _context.TaskHistories.Add(history);
        }
    }
}
