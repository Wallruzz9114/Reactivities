using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.v1
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ActivityDTO>>> GetActivitiesAsync()
        {
            return await Mediator.Send(new AllActivities.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDTO>> GetActivityByIdAsync(Guid id)
        {
            return await Mediator.Send(new OneActivity.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivityAsync(CreateActivity.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> UpdateActivityAsync(Guid id, UpdateActivity.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> DeleteActivityAsync(Guid id)
        {
            return await Mediator.Send(new DeleteActivity.Command { Id = id });
        }

        [HttpPost("attendance/{id}")]
        public async Task<ActionResult<Unit>> AttendActivityAsync(Guid id)
        {
            return await Mediator.Send(new AttendActivity.Command { Id = id });
        }

        [HttpDelete("attendance/{id}")]
        public async Task<ActionResult<Unit>> UnattendActivityAsync(Guid id)
        {
            return await Mediator.Send(new UnattendActivity.Command { Id = id });
        }
    }
}