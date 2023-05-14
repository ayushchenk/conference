using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace ConferenceManager.Core.Common.Model;

public class PaginatedList<T> : IEnumerable<T>
{
    public IReadOnlyCollection<T> Items { get; }

    public int PageIndex { get; }

    public int PageSize { get; }

    public int TotalPages { get; }

    public int TotalCount { get; }

    public bool HasPreviousPage => PageIndex > 1;

    public bool HasNextPage => PageIndex < TotalPages;

    private PaginatedList(IReadOnlyCollection<T> items, int count, int pageIndex, int pageSize)
    {
        PageIndex = pageIndex;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        TotalCount = count;
        Items = items;
    }

    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
    {
        var count = await source.CountAsync();
        var items = await source.Skip(pageIndex * pageSize).Take(pageSize).ToListAsync();

        return new PaginatedList<T>(items, count, pageIndex, pageSize);
    }

    public static PaginatedList<T> Create(IEnumerable<T> source, int pageIndex, int pageSize)
    {
        var count = source.Count();
        var items = source.Skip(pageIndex * pageSize).Take(pageSize).ToList();

        return new PaginatedList<T>(items, count, pageIndex, pageSize);
    }

    public IEnumerator<T> GetEnumerator()
    {
        return Items.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
