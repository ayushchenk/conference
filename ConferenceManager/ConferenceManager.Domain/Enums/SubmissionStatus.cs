namespace ConferenceManager.Domain.Enums
{
    public enum SubmissionStatus : byte
    {
        Created = 1,
        Returned = 2,
        Updated = 3,
        AcceptedWithSuggestions = 4,
        Accepted = 5,
        Rejected = 6
    }
}
