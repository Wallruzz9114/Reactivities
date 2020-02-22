using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivitiesAsync()
        {
            return await Mediator.Send(new AllActivities.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityByIdAsync(Guid id)
        {
            return await Mediator.Send(new OneActivity.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivityAsync(Application.Activities.CreateActivity.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> UpdateActivityAsync(Guid id, Application.Activities.UpdateActivity.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteActivityAsync(Guid id)
        {
            return await Mediator.Send(new Application.Activities.DeleteActivity.Command { Id = id });
        }
    }
}