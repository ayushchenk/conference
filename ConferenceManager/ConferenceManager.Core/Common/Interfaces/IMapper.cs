namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IMapper<TSource, TDestionation>
    {
        TDestionation Map(TSource source);
    }
}
