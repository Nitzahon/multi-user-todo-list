namespace Backend.Constants
{
    public static class TaskStatus
    {
        public const string TODO = "TODO";
        public const string IN_PROGRESS = "IN PROGRESS";
        public const string DONE = "DONE";
        public static readonly HashSet<string> All =
        [
            TODO,
            IN_PROGRESS,
            DONE,
        ];
    }
}
