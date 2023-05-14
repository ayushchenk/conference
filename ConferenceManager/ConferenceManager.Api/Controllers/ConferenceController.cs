using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Conferences.Commands.Create;
using ConferenceManager.Core.Conferences.Commands.Delete;
using ConferenceManager.Core.Conferences.Commands.Update;
using ConferenceManager.Core.Conferences.Queries.Get;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    public class ConferenceController : ApiControllerBase
    {
        [HttpPost]
        [Authorize(Roles = $"{ApplicationRole.GlobalAdmin},{ApplicationRole.ConferenceAdmin}")]
        public async Task<IActionResult> Post(ConferenceDto conference, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new CreateConferenceCommand(conference), cancellation);

            return Created(nameof(ConferenceController), result);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferenceQuery(id), cancellation);

            return OkOrNotFound(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = ApplicationRole.GlobalAdmin)]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new DeleteConferenceCommand(id), cancellation);

            return NoContent();
        }

        [HttpPut]
        [Authorize(Roles = $"{ApplicationRole.GlobalAdmin},{ApplicationRole.ConferenceAdmin}")]
        public async Task<IActionResult> Put(ConferenceDto conference, CancellationToken cancellation)
        {
            await Mediator.Send(new UpdateConferenceCommand(conference), cancellation);

            return NoContent();
        }
    }
}
