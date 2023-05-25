using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Account.Login;
using ConferenceManager.Core.Account.Register;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Core.User.Delete;
using ConferenceManager.Core.User.Get;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ApiControllerBase
    {
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserCommand command, CancellationToken cancellation)
        {
            var token = await Mediator.Send(command, cancellation);

            return Ok(token);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserCommand command, CancellationToken cancellation)
        {
            var token = await Mediator.Send(command, cancellation);

            return Ok(token);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetUserQuery(id), cancellation);

            return OkOrNotFound(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> Delete(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new DeleteUserCommand(id), cancellation);

            return NoContent();
        }

        [HttpPost]
        [Route("{id}/role")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> AssignRole(int id, AssignRoleCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(new AssignRoleCommand(id, command.Role), cancellation);

            return NoContent();
        }

        [HttpDelete]
        [Route("{id}/role")]
        [Authorize(Roles = ApplicationRole.Admin)]
        public async Task<IActionResult> UnassignRole(int id, UnassignRoleCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(new UnassignRoleCommand(id, command.Role), cancellation);

            return NoContent();
        }
    }
}
