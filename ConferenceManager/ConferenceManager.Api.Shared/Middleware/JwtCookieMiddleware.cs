using ConferenceManager.Api.Shared.Util;
using Microsoft.AspNetCore.Http;

namespace ConferenceManager.Api.Shared.Middleware
{
    public class JwtCookieMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            var token = context.Request.Cookies[Cookies.Token];

            if (!string.IsNullOrEmpty(token))
            {
                context.Request.Headers.Authorization = $"Bearer {token}";
            }

            context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
            context.Response.Headers.Add("X-Xss-Protection", "1");
            context.Response.Headers.Add("X-Frame-Options", "DENY");

            await next(context);
        }
    }
}
