namespace ConferenceManager.Core.Common.Exceptions
{
    public class ForbiddenException : Exception
    {
        public const string GenericMessage = "User does not have persmission to access this resource";

        public ForbiddenException() : base(GenericMessage)
        {
        }

        public ForbiddenException(string message) : base(message)
        {
        }
    }
}
