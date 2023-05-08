using ConferenceManager.Api.Abstract;
using ConferenceManager.Core.Account.Commands.Login;
using ConferenceManager.Core.Account.Commands.Register;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : ApiControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Register(RegisterUserCommand command)
        {
            var token = await Mediator.Send(command);

            return Ok(token);
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginUserCommand command)
        {
            var token = await Mediator.Send(command);

            return Ok(token);
        }
    }
}
