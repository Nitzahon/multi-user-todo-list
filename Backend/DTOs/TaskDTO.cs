using System.Text.Json.Serialization;

namespace Backend.DTOs
{
    public class TaskDTO
    {
        public required string Title { get; set; }
        
        public string? Description { get; set; }
        
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)] // Exclude from Swagger if not explicitly set
        public required string Status { get; set; } = Constants.TaskStatus.TODO; // "TODO", "IN PROGRESS", "DONE"
        
        public required Guid AssignedUserId { get; set; }
    }
}
