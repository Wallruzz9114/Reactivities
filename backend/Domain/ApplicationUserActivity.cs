using System;

namespace Domain
{
    public class ApplicationUserActivity
    {
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; }

        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}