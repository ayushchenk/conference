﻿using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Submissions.AddPreference;
using ConferenceManager.Core.Submissions.AddReviewer;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Core.Submissions.Create;
using ConferenceManager.Core.Submissions.CreateReview;
using ConferenceManager.Core.Submissions.Get;
using ConferenceManager.Core.Submissions.GetReviewers;
using ConferenceManager.Core.Submissions.GetReviews;
using ConferenceManager.Core.Submissions.Papers;
using ConferenceManager.Core.Submissions.RemoveReviewer;
using ConferenceManager.Core.Submissions.Return;
using ConferenceManager.Core.Submissions.Update;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ConferenceManager.Api.Controllers
{
    public class SubmissionController : ApiControllerBase
    {
        /// <summary>
        /// Creates new submission
        /// </summary>
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Author)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CreateEntityResponse))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        public async Task<IActionResult> Post([FromForm] CreateSubmissionCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(SubmissionController), result);
        }

        /// <summary>
        /// Updates submission information
        /// </summary>
        /// <remarks>
        /// Author can only update submission, if it was returned by reviewer. <br/>
        /// All payload except File is required, when File is present, new record in Papers table is created.
        /// </remarks>
        [HttpPut]
        [Authorize(Roles = ApplicationRole.Author)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Put([FromForm] UpdateSubmissionCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        /// <summary>
        /// Returns submission by id
        /// </summary>
        /// <remarks>
        /// User can only access submissions from conferences, that he is part of (not requried for Admin)
        /// </remarks>
        [HttpGet]
        [Route("{id}")]
        [Authorize]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(SubmissionDto))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionQuery(id), cancellation);

            return OkOrNotFound(result);
        }

        /// <summary>
        /// Returns submission papers
        /// </summary>
        /// <remarks>
        /// Papers are ordered by created on descending. <br/>
        /// Author can only get papers of his own submission. <br/>
        /// Reviewer can only get papers of submission, that he is assigned to. <br/>
        /// Admin can access everything.
        /// </remarks>
        [HttpGet]
        [Route("{id}/papers")]
        [Authorize]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = (typeof(IEnumerable<PaperDto>)))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> GetPapers(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionPapersQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Creates new review for submission
        /// </summary>
        /// <remarks>
        /// Reviewer can only create one review for a submission. <br/>
        /// Reviewer can only send reviews to submissions, that he is assigned to.
        /// </remarks>
        [HttpPost]
        [Route("{id}/reviews")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CreateEntityResponse))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> PostReview(int id, CreateReviewCommand command, CancellationToken cancellation)
        {
            command.SubmissionId = id;
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(SubmissionController), result);
        }

        /// <summary>
        /// Returns reviews for submission
        /// </summary>
        /// <remarks>
        /// Reviewer can only see reviews of submission, he is assigned to
        /// </remarks>
        [HttpGet]
        [Route("{id}/reviews")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Reviewer}")]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<ReviewDto>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> GetReviews(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionReviewsQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Marks submission to be updated by author
        /// </summary>
        /// <remarks>
        /// Reviwer can only return submission after it was created or updated by author. <br/>
        /// Reviwer can only return submission that he is assigned to. <br/>
        /// </remarks>
        [HttpPost]
        [Route("{id}/return")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Return(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new ReturnSubmissionCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Returns reviewers of submission
        /// </summary>
        /// <remarks>
        /// Ordered by user id. <br/>
        /// Reviewer should be in the same conference as submission
        /// </remarks>
        [HttpGet]
        [Route("{id}/reviewers")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Reviewer}")]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = (typeof(IEnumerable<UserDto>)))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> GetReviewers(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionReviewersQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Assign reviewer to submission
        /// </summary>
        /// <remarks>
        /// Reviewer should be in the same conference with sumbission
        /// </remarks>
        [HttpPost]
        [Route("{id}/reviewers/{userId}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> AddReviewer(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new AddReviewerCommand(id, userId), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Unassign reviewer from submission
        /// </summary>
        [HttpDelete]
        [Route("{id}/reviewers/{userId}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> RemoveReviewer(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new RemoveReviewerCommand(id, userId), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Submits preference for a submission review
        /// </summary>
        /// <remarks>
        /// Reviewer should be in the same conference with sumbission
        /// </remarks>
        [HttpPost]
        [Route("{id}/preference")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> AddPreference(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new AddSubmissionPreferenceCommand(id), cancellation);

            return NoContent();
        }
    }
}
