using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Common.Queries
{
    public abstract class GetEntityPageQuery<TDto> : IRequest<EntityPageResponse<TDto>> where TDto : IDto
    {
        public int PageIndex { get; }

        public int PageSize { get; }

        protected GetEntityPageQuery(int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
        }
    }
}
