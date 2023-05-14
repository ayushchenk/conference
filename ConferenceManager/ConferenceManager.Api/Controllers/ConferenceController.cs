﻿using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Conferences.Commands.Create;
using ConferenceManager.Core.Conferences.Commands.Delete;
using ConferenceManager.Core.Conferences.Commands.Update;
using ConferenceManager.Core.Conferences.Queries.Get;
using ConferenceManager.Core.Conferences.Queries.Page;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    public class ConferenceController : ApiControllerBase
    {
        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferenceQuery(id), cancellation);

            return OkOrNotFound(result);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get(int pageIndex, int pageSize, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferencePageQuery(pageIndex, pageSize), cancellation);

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = $"{ApplicationRole.GlobalAdmin},{ApplicationRole.ConferenceAdmin}")]
        public async Task<IActionResult> Post(ConferenceDto conference, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new CreateConferenceCommand(conference), cancellation);

            return Created(nameof(ConferenceController), result);
        }

        [HttpPut]
        [Authorize(Roles = $"{ApplicationRole.GlobalAdmin},{ApplicationRole.ConferenceAdmin}")]
        public async Task<IActionResult> Put(ConferenceDto conference, CancellationToken cancellation)
        {
            await Mediator.Send(new UpdateConferenceCommand(conference), cancellation);

            return NoContent();
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = ApplicationRole.GlobalAdmin)]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new DeleteConferenceCommand(id), cancellation);

            return NoContent();
        }
    }
}
