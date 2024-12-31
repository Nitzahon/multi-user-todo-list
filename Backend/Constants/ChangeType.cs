using System.Collections.Generic;

namespace Backend.Constants
{
    public static class ChangeType
    {
        public const string Title = "Title Change";
        public const string Description = "Description Change";
        public const string Status = "Status Change";
        public const string AssignedUserId = "Assigned User Change";
        public const string TaskCreated = "Task Created";
        public const string TaskDeleted = "Task Deleted";

        public static readonly Dictionary<string, string> PropertyToChangeTypeMap = new()
        {
            { "Title", Title },
            { "Description", Description },
            { "Status", Status },
            { "AssignedUserId", AssignedUserId }
        };
        
        public static readonly HashSet<string> All =
        [
            Title,
            Description,
            Status,
            AssignedUserId,
            TaskCreated,
            TaskDeleted
        ];
    }
}
