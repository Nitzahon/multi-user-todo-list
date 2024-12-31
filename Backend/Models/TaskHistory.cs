using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class TaskHistory
    {
        public Guid Id { get; set; }

        public Guid? TaskId { get; set; }

        public Task? Task { get; set; } = null!;

        [Required]
        public DateTime ChangeDate { get; set; } // Configure default in DbContext

        [Required]
        public Guid ChangedByUserId { get; set; }

        public User ChangedByUser { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string ChangeType { get; set; } = null!; // Configure default in DbContext
    }
}
