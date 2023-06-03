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
            string path = $"{httpContext.Request.Method} {httpContext.Request.Path}";

            _logger.LogInformation(path);

            await next(httpContext);

            _logger.LogInformation($"{path} {httpContext.Response.StatusCode}");
        }
    }
}
