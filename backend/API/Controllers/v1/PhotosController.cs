using System.Threading.Tasks;
using Application.Photos.Commands;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> AddPhotoAsync([FromForm]AddPhoto.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("setMainPhoto/{id}")]
        public async Task<ActionResult<Unit>> SetMainPhotoAsync(string id)
        {
            return await Mediator.Send(new SetMainPhoto.Command { Id = id });
        }

        [HttpDelete]
        public async Task<ActionResult<Unit>> DeletePhotoAsync(string id)
        {
            return await Mediator.Send(new DeletePhoto.Command { Id = id });
        }
    }
}