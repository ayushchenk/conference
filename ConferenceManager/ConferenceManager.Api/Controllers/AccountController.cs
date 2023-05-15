using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Account.Login;
using ConferenceManager.Core.Account.Register;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : ApiControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Register(RegisterUserCommand command, CancellationToken cancellation)
        {
            var token = await Mediator.Send(command, cancellation);

            return Ok(token);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginUserCommand command, CancellationToken cancellation)
        {
            var token = await Mediator.Send(command, cancellation);

            return Ok(token);
        }
    }
}
