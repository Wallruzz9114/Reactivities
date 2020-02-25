using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.UserProfiles.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.UserProfiles.Queries
{
    public class GetUserProfile
    {
        public class Query : IRequest<UserProfile>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserProfile>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<UserProfile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username);

                return new UserProfile
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    ProfilePicture = user.Photos.FirstOrDefault(photo => photo.IsMain)?.URL,
                    Bio = user.Bio,
                    Photos = user.Photos
                };
            }
        }
    }
}