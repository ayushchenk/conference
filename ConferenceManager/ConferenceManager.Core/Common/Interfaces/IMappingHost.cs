namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IMappingHost
    {
        TDestination Map<TSource, TDestination>(TSource source);
    }
}
