using System.Collections.Generic;
using Domain;

namespace Application.UserProfiles.Models
{
    public class UserProfile
    {
        public string DisplayName { get; set; }
        public string Username { get; set; }
        public string ProfilePicture { get; set; }
        public string Bio { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}