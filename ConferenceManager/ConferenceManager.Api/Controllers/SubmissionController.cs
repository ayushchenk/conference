using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Submissions.AddReviewer;
using ConferenceManager.Core.Submissions.Create;
using ConferenceManager.Core.Submissions.Get;
using ConferenceManager.Core.Submissions.GetReviewers;
using ConferenceManager.Core.Submissions.Papers;
using ConferenceManager.Core.Submissions.RemoveReviewer;
using ConferenceManager.Core.Submissions.Return;
using ConferenceManager.Core.Submissions.Update;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ConferenceManager.Api.Controllers
{
    public class SubmissionController : ApiControllerBase
    {
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Author)]
        public async Task<IActionResult> Post([FromForm] CreateSubmissionCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(SubmissionController), result);
        }

        [HttpPut]
        [Authorize(Roles = ApplicationRole.Author)]
        public async Task<IActionResult> Put([FromForm] UpdateSubmissionCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionQuery(id), cancellation);

            return OkOrNotFound(result);
        }

        [HttpPost]
        [Route("{id}/return")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        public async Task<IActionResult> UploadPaper(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new ReturnSubmissionCommand(id), cancellation);

            return NoContent();
        }

        [HttpGet]
        [Route("{id}/papers")]
        [Authorize]
        public async Task<IActionResult> GetPapers(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionPapersQuery(id), cancellation);

            return Ok(result);
        }

        [HttpPost]
        [Route("{id}/reviewers/{userId}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> AddReviewer(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new AddReviewerCommand(id, userId), cancellation);
                
            return NoContent();
        }

        [HttpDelete]
        [Route("{id}/reviewers/{userId}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> RemoveReviewer(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new RemoveReviewerCommand(id, userId), cancellation);

            return NoContent();
        }

        [HttpGet]
        [Route("{id}/reviewers")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Reviewer}")]
        public async Task<IActionResult> GetReviewers(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionReviewersQuery(id), cancellation);

            return Ok(result);
        }
    }
}
