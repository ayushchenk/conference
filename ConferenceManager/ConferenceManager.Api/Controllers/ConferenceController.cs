using ConferenceManager.Api.Abstract;
using ConferenceManager.Api.Filters;
using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Conferences.AddParticipant;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Core.Conferences.Create;
using ConferenceManager.Core.Conferences.Delete;
using ConferenceManager.Core.Conferences.Get;
using ConferenceManager.Core.Conferences.GetParticipants;
using ConferenceManager.Core.Conferences.GetSubmissions;
using ConferenceManager.Core.Conferences.Page;
using ConferenceManager.Core.Conferences.RemoveParticipant;
using ConferenceManager.Core.Conferences.Update;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ConferenceManager.Api.Controllers
{
    public class ConferenceController : ApiControllerBase
    {
        /// <summary>
        /// Creates new conference
        /// </summary>
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Admin)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CreateEntityResponse))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        public async Task<IActionResult> Post(CreateConferenceCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(ConferenceController), result);
        }

        /// <summary>
        /// Updates conference information
        /// </summary>
        /// <remarks>
        /// All fields are required, payload replaces existing record in db. <br/>
        /// Chair can only update his conference.
        /// </remarks>
        [HttpPut]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CreateEntityResponse))]
        [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
        public async Task<IActionResult> Put(UpdateConferenceCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

            return NoContent();
        }


        /// <summary>
        /// Returns conference page
        /// </summary>
        /// <remarks>
        /// Page is ordered by end date descending
        /// </remarks>
        [HttpGet]
        [Authorize]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(EntityPageResponse<ConferenceDto>))]
        public async Task<IActionResult> Get(int pageIndex, int pageSize, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferencePageQuery(pageIndex, pageSize), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns conference by id
        /// </summary>
        [HttpGet]
        [Route("{id}")]
        [Authorize]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ConferenceDto))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferenceQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Deletes conference
        /// </summary>
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new DeleteConferenceCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Adds participant to conference
        /// </summary>
        [HttpPost]
        [Route("{id}/participants/{userId}")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> AddParticipant(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new AddParticipantCommand(id, userId), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Removes participant from conference
        /// </summary>
        [HttpDelete]
        [Route("{id}/participants/{userId}")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> RemoveParticipant(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new RemoveParticipantCommand(id, userId), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Returns conference submissions page
        /// </summary>
        /// <remarks>
        /// User should be part of conference where submission is located (not required for Admin). <br/>
        /// For authors, returns only his submissions. <br/>
        /// Page is ordered by createdon descending.
        /// </remarks>
        [HttpGet]
        [Route("{id}/submissions")]
        [Authorize]
        [ConferenceAuthorization]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(EntityPageResponse<SubmissionDto>))]
        [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> GetSubmissions(int id, int pageIndex, int pageSize, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferenceSubmissionsQuery(id, pageIndex, pageSize), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns conference participants page
        /// </summary>
        [HttpGet]
        [Route("{id}/participants")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [Produces("application/json")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(EntityPageResponse<UserDto>))]
        [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
        public async Task<IActionResult> GetParticipants(int id, int pageIndex, int pageSize, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetConferenceParticipantsQuery(id, pageIndex, pageSize), cancellation);

            return Ok(result);
        }
    }
}
