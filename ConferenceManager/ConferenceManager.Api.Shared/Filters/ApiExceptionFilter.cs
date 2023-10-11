using ConferenceManager.Core.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CleanArchitecture.WebUI.Filters
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private readonly IDictionary<Type, Action<ExceptionContext>> _exceptionHandlers;

        public ApiExceptionFilter()
        {
            _exceptionHandlers = new Dictionary<Type, Action<ExceptionContext>>
            {
                { typeof(ValidationException), HandleValidationException },
                { typeof(IdentityException), HandleIdentityException },
                { typeof(NotFoundException), HandleNotFoundException },
                { typeof(ForbiddenException), HandleForbiddenException },
            };
        }

        public override void OnException(ExceptionContext context)
        {
            HandleException(context);

            base.OnException(context);
        }

        private void HandleException(ExceptionContext context)
        {
            Type type = context.Exception.GetType();

            if (_exceptionHandlers.ContainsKey(type))
            {
                _exceptionHandlers[type].Invoke(context);
                return;
            }

            if (!context.ModelState.IsValid)
            {
                HandleInvalidModelStateException(context);
                return;
            }
        }

        private void HandleValidationException(ExceptionContext context)
        {
            var exception = (ValidationException)context.Exception;

            var details = new ValidationProblemDetails(exception.Errors)
            {
                Title = "Validation failed",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1"
            };

            context.Result = new BadRequestObjectResult(details);
            context.ExceptionHandled = true;
        }

        private void HandleIdentityException(ExceptionContext context)
        {
            var exception = (IdentityException)context.Exception;

            var details = new ValidationProblemDetails(exception.Errors)
            {
                Title = "Validation failed",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1"
            };

            context.Result = new BadRequestObjectResult(details);
            context.ExceptionHandled = true;
        }

        private void HandleNotFoundException(ExceptionContext context)
        {
            var exception = (NotFoundException)context.Exception;

            var details = new ProblemDetails()
            {
                Title = "Not found",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4",
                Detail = exception.Message,
                Status = StatusCodes.Status404NotFound,
            };

            context.Result = new NotFoundObjectResult(details);
            context.ExceptionHandled = true;
        }

        private void HandleForbiddenException(ExceptionContext context)
        {
            var exception = (ForbiddenException)context.Exception;

            var details = new ProblemDetails()
            {
                Title = "Access denied",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3",
                Detail = exception.Message,
                Status = StatusCodes.Status403Forbidden,
            };

            context.Result = new ObjectResult(details);
            context.ExceptionHandled = true;
        }

        private void HandleInvalidModelStateException(ExceptionContext context)
        {
            var details = new ValidationProblemDetails(context.ModelState)
            {
                Title = "Validation failed",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1"
            };

            context.Result = new BadRequestObjectResult(details);
            context.ExceptionHandled = true;
        }
    }
}