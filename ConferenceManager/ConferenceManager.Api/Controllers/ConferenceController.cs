using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Core.Conferences.Commands.Create;
using ConferenceManager.Core.Conferences.Commands.Get;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    public class ConferenceController : ApiControllerBase
    {
        [HttpPost]
        [Authorize(Roles = $"{ApplicationRole.GlobalAdmin},{ApplicationRole.ConferenceAdmin}")]
        public async Task<IActionResult> Post(ConferenceDto conference)
        {
            var result = await Mediator.Send(new CreateConferenceCommand(conference));

            return Created(nameof(ConferenceController), result);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id)
        {
            var result = await Mediator.Send(new GetConferenceQuery(id));

            return OkOrNotFound(result);
        }

        //[HttpDelete]
        //[Route("id")]
        //[Authorize(Roles)]
    }
}
