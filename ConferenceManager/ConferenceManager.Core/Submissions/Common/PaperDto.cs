using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Core.Submissions.Common
{
    public class PaperDto : IDto
    {
        public required int Id { set; get; }

        public required int SubmissionId { set; get; }

        public required PaperType Type { set; get; }

        public required string TypeLabel { set; get; }

        public required string FileName { set; get; }

        public required DateTime CreatedOn { set; get; }
    }
}
