using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Task
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = null!;

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = null!; // Configure default in DbContext

        [Required]
        public Guid AssignedUserId { get; set; }

        public User AssignedUser { get; set; } = null!;

        public DateTime CreatedDate { get; set; } // Configure default in DbContext

        public ICollection<TaskHistory> TaskHistories { get; set; } = new List<TaskHistory>();
    }
}
