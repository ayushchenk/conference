namespace ConferenceManager.Domain.Enums
{
    public enum SubmissionStatus : byte
    {
        Created = 1,
        Returned = 2,
        PendingReview = 3,
        Accepted = 4,
        Rejected = 5
    }
}
