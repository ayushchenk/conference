using MediatR;

namespace ConferenceManager.Core.Common.Queries
{
    public class GetEntitiesQuery<T> : IRequest<IEnumerable<T>>
    {
    }
}
