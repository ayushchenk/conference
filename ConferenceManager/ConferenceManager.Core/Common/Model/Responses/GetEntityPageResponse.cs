namespace ConferenceManager.Core.Common.Model.Responses
{
    public class GetEntityPageResponse<TEntity>
    {
        public required IEnumerable<TEntity> Items { get; init; }

        public required int TotalCount { get; init; }

        public required int TotalPages { get; init; }
    }
}
