namespace Backend.Constants
{
    public static class UserRole
    {
        public const string ADMIN = "ADMIN";
        public const string USER = "USER";
        public static readonly HashSet<string> All =
        [
            ADMIN,
            USER,
        ];
    }
}
