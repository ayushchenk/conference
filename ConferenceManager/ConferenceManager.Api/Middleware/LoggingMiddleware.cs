namespace ConferenceManager.Api.Middleware
{
    public class LoggingMiddleware : IMiddleware
    {
        private readonly ILogger<LoggingMiddleware> _logger;

        public LoggingMiddleware(ILogger<LoggingMiddleware> logger)
        {
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next)
        {
            _logger.LogInformation($"{httpContext.Request.Method} {httpContext.Request.Path}");

            await next(httpContext);
        }
    }
}
