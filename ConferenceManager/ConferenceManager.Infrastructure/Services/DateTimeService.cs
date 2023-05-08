using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Infrastructure.Services
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime Now => DateTime.UtcNow;
    }
}
