namespace ConferenceManager.Core.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public const string GenericMessage = "Resource not found";

        public NotFoundException() : base(GenericMessage)
        {
        }

        public NotFoundException(string message) : base(message)
        {
        }
    }
}
