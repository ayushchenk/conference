using ConferenceManager.Api.Abstract;
using ConferenceManager.Api.Filters;
using ConferenceManager.Api.Util;
using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Core.User.AssignAdminRole;
using ConferenceManager.Core.User.Delete;
using ConferenceManager.Core.User.Get;
using ConferenceManager.Core.User.GetParticipations;
using ConferenceManager.Core.User.GetSubmissions;
using ConferenceManager.Core.User.IsParticipant;
using ConferenceManager.Core.User.IsReviewer;
using ConferenceManager.Core.User.Login;
using ConferenceManager.Core.User.Page;
using ConferenceManager.Core.User.Register;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ConferenceManager.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ApiControllerBase
    {
        /// <summary>
        /// Creates and authenticates new user
        /// </summary>
        /// <remarks>
        /// Emails are configured to be unique for all users. <br/>
        /// Password should have at least 1 number, 1 upper-case letter, <br/>
        /// 1 non-alphabetical character and be at least 8 characters min. <br/>
        /// Default role for new user is 'Author'.
        /// </remarks> 
        [HttpPost]
        [Route("register")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(TokenResponse))]
        public async Task<IActionResult> Register(RegisterUserCommand command, CancellationToken cancellation)
        {
            var token = await Mediator.Send(command, cancellation);

            return Ok(token);
        }

        /// <summary>
        /// Authenticates existing user
        /// </summary>
        [HttpPost]
        [Route("login")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(TokenResponse))]
        public async Task<IActionResult> Login(LoginUserCommand command, CancellationToken cancellation)
        {
            var token = await Mediator.Send(command, cancellation);

            return Ok(token);
        }

        /// <summary>
        /// Returns page of users
        /// </summary>
        /// <remarks>
        /// Page is ordered by user id
        /// </remarks>
        [HttpGet]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(EntityPageResponse<UserDto>))]
        public async Task<IActionResult> GetPage(int pageIndex, int pageSize, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetUserPageQuery(pageIndex, pageSize), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns user by id
        /// </summary>
        /// <remarks>
        /// Non-admins can only query their data
        /// </remarks>
        [HttpGet]
        [Route("{id}")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(UserDto))]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetUserQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Deletes user by id
        /// </summary>
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new DeleteUserCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Assigns role to the user
        /// </summary>
        [HttpPost]
        [Route("{id}/role")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> AssignRole(
            [FromHeader(Name = Headers.ConferenceId)] int conferenceId,
            int id,
            AssignRoleCommand command,
            CancellationToken cancellation)
        {
            command.Id = id;
            command.ConferenceId = conferenceId;
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        /// <summary>
        /// Unassigns role from the user
        /// </summary>
        [HttpDelete]
        [Route("{id}/role")]
        [Authorize(Roles = $"{ApplicationRole.Admin},{ApplicationRole.Chair}")]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UnassignRole(
            [FromHeader(Name = Headers.ConferenceId)] int conferenceId,
            int id,
            UnassignRoleCommand command,
            CancellationToken cancellation)
        {
            command.Id = id;
            command.ConferenceId = conferenceId;
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        /// <summary>
        /// Assigns admin role to the user
        /// </summary>
        [HttpPost]
        [Route("{id}/role/admin")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> AssignAdminRole(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new AssignAdminRoleCommand(id, AssignOperation.Assign), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Unassigns admin role from the user
        /// </summary>
        [HttpDelete]
        [Route("{id}/role/admin")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> UnassignAdminRole(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new AssignAdminRoleCommand(id, AssignOperation.Unassign), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Returns users conference participations
        /// </summary>
        /// <remarks>
        /// Conferences are ordered by end date descending
        /// </remarks>
        [HttpGet]
        [Route("{id}/participations")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<ConferenceDto>))]
        public async Task<IActionResult> GetParticipations(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetUserParticipationsQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns users submissions
        /// </summary>
        /// <remarks>
        /// Submissions are ordered by createdon descending
        /// </remarks>
        [HttpGet]
        [Route("{id}/submissions")]
        [Authorize(Roles = ApplicationRole.Admin)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<ConferenceDto>))]
        public async Task<IActionResult> GetSubmissions(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetUserSubmissionsQuery(id), cancellation);

            return Ok(result);
        }
    }
}
