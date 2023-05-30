using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Api.Services
{
    public class MapperDescription
    {
        public required Type Source { get; init; }
        public required Type Destination { get; init; }
        public required Type Service { get; init; }
        public required Type Implementation { get; init; }
    }

    public class MappingHost : IMappingHost
    {
        private static readonly object _locker = new object();
        private readonly IReadOnlyList<MapperDescription> _mappings;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MappingHost(List<MapperDescription> mappings, IHttpContextAccessor httpContextAccessor)
        {
            _mappings = mappings;
            _httpContextAccessor = httpContextAccessor;
        }

        public TDestination Map<TSource, TDestination>(TSource source)
        {
            var sourceType = typeof(TSource);
            var destinationType = typeof(TDestination);
            MapperDescription? mapperDescription;
            
            lock (_locker)
            {
                mapperDescription = _mappings.SingleOrDefault(x => x.Source == sourceType && x.Destination == destinationType);
            }

            if (mapperDescription == null)
            {
                throw new InvalidOperationException($"Mapper for source {sourceType} and destination {destinationType} not found");
            }

            var mapper = _httpContextAccessor.HttpContext?.RequestServices.GetRequiredService(mapperDescription.Service) as IMapper<TSource, TDestination>;

            if (mapper == null)
            {
                throw new InvalidOperationException($"Unable to create mapper for source {sourceType} and destination {destinationType}");
            }

            return mapper.Map(source);
        }
    }
}
