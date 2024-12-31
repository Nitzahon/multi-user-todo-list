namespace Backend.DTOs
{
    public class UserLoginDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class UserRegisterDTO
    {
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; } = Constants.UserRole.USER; // "USER" or "ADMIN"
    }
}
