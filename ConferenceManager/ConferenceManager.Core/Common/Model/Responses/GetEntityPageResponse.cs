using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Common.Model.Responses
{
    public class GetEntityPageResponse<TEntity> where TEntity : IDto
    {
        public required IEnumerable<TEntity> Items { get; init; }

        public required int TotalCount { get; init; }

        public required int TotalPages { get; init; }
    }
}
