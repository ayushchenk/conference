using Microsoft.AspNetCore.Http;

namespace ConferenceManager.Core.Common.Extensions
{
    public static class FormFileExtensions
    {
        public static byte[] ToBytes(this IFormFile file)
        {
            using var stream = new MemoryStream();
            file.CopyTo(stream);
            return stream.ToArray();
        }
    }
}
