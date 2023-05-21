using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Submissions.Create;
using ConferenceManager.Core.Submissions.Get;
using ConferenceManager.Core.Submissions.Return;
using ConferenceManager.Core.Submissions.Update;
using ConferenceManager.Core.Submissions.UpdatePaper;
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

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionQuery(id), cancellation);

            return OkOrNotFound(result);
        }

        [HttpPut]
        [Authorize(Roles = ApplicationRole.Author)]
        public async Task<IActionResult> Put(UpdateSubmissionCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        [HttpPost]
        [Route("file")]
        [Authorize(Roles = ApplicationRole.Author)]
        public async Task<IActionResult> UploadPaper([FromForm] UploadPaperCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        [HttpPost]
        [Route("{id}/return")]
        [Authorize(Roles = ApplicationRole.Reviwer)]
        public async Task<IActionResult> UploadPaper(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new ReturnSubmissionCommand(id), cancellation);

            return NoContent();
        }
    }
}
