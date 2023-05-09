using ConferenceManager.Infrastructure.Util;

namespace ConferenceManager.Core.Common.Model.Settings
{
    public class AppSettings
    {
        public required TokenSettings TokenSettings { get; init; }

        public required SeedSettings SeedSettings { get; init; }
    }
}
