using System.Threading.Tasks;
using Application.UserProfiles.Commands;
using Application.UserProfiles.Models;
using Application.UserProfiles.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{
    public class UserProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<UserProfile>> GetUserProfileAsync(string username)
        {
            return await Mediator.Send(new GetUserProfile.Query { Username = username });
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> EditUserProfileAsync(EditUserProfile.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}