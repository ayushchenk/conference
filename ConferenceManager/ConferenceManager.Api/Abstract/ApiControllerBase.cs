using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Abstract
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApiControllerBase : ControllerBase
    {
        private ISender? _mediator;

        protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    }
}
