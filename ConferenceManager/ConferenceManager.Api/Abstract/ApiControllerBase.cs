using CleanArchitecture.WebUI.Filters;
using ConferenceManager.Core.Common.Model.Responses;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Abstract
{
    [ApiController]
    [ApiExceptionFilter]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        private ISender? _mediator;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();

        protected IActionResult OkOrNotFound(object? result)
        {
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}
