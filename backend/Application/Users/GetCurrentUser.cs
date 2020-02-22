using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Users.Models;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class GetCurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<ApplicationUser> _userManager;
            private readonly IJWTGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;

            public Handler(UserManager<ApplicationUser> userManager, IJWTGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}