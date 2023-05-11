using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Conferences.Commands.Create;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    public class ConferenceController : ApiControllerBase
    {
        [HttpPost]
        [Authorize(Roles = ApplicationRole.GlobalAdmin)]
        public async Task<IActionResult> Post(CreateConferenceCommand command)
        {
            var result = await Mediator.Send(command);

            return Created(nameof(ConferenceController), result);
        }
    }
}
