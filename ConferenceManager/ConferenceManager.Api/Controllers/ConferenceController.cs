using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Conferences.Create;
using ConferenceManager.Core.Conferences.Delete;
using ConferenceManager.Core.Conferences.Get;
using ConferenceManager.Core.Conferences.Page;
using ConferenceManager.Core.Conferences.Update;
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
        public async Task<IActionResult> Post(CreateConferenceCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(ConferenceController), result);
        }

        [HttpPut]
        [Authorize(Roles = $"{ApplicationRole.GlobalAdmin},{ApplicationRole.ConferenceAdmin}")]
        public async Task<IActionResult> Put(UpdateConferenceCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

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
