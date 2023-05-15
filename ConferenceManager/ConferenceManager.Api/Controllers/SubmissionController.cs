using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Submissions.Create;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    public class SubmissionController : ApiControllerBase
    {
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Author)]
        public async Task<IActionResult> Post([FromForm] CreateSubmissionCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Ok(result);
        }
    }
}
