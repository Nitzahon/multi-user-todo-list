using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = null!;

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        public string PasswordHash { get; set; } = null!;

        [Required]
        [MaxLength(10)]
        public string Role { get; set; } = null!; // Configure default in DbContext
    }
}
