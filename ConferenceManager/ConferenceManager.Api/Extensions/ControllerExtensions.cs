using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Extensions
{
    public static class ControllerExtensions
    {
        public static IActionResult OkOrNotFound(this ControllerBase controller, object result)
        {
            if (result == null)
            {
                return controller.NotFound();
            }

            return controller.Ok(result);
        }
    }
}
