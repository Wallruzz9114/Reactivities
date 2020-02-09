using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiController]

    public class ActivitiesController
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivitiesAsync()
        {
            return await _mediator.Send(new AllActivities.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityByIdAsync(Guid id)
        {
            return await _mediator.Send(new OneActivity.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivityAsync(Application.Activities.CreateActivity.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> UpdateActivityAsync(Guid id, Application.Activities.UpdateActivity.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteActivityAsync(Guid id)
        {
            return await _mediator.Send(new Application.Activities.DeleteActivity.Command { Id = id });
        }
    }
}