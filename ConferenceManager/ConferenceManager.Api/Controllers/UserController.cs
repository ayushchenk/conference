using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Account.Login;
using ConferenceManager.Core.Account.Register;
using ConferenceManager.Core.User.Get;
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
        [Authorize]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetUserQuery(id) , cancellation);

            return OkOrNotFound(result);
        }
    }
}
