using CleanArchitecture.WebUI.Filters;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Annotations;

namespace ConferenceManager.Api.Abstract
{
    [ApiController]
    [ApiExceptionFilter]
    [Produces("application/json")]
    [SwaggerResponse(StatusCodes.Status400BadRequest, Type = typeof(ValidationProblemDetails))]
    [SwaggerResponse(StatusCodes.Status403Forbidden, Type = typeof(ProblemDetails))]
    [SwaggerResponse(StatusCodes.Status404NotFound, Type = typeof(ProblemDetails))]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        private ISender? _mediator;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    }
}
