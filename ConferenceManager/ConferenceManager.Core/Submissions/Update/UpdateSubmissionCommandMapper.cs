using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Update
{
    public class UpdateSubmissionCommandMapper : IMapper<UpdateSubmissionCommand, Submission>
    {
        public Submission Map(UpdateSubmissionCommand source)
        {
            var submission = new Submission()
            {
                Id = source.Id,
                Abstract = source.Abstract,
                Keywords = source.Keywords,
                Title = source.Title,
                Status = Domain.Enums.SubmissionStatus.Updated
            };

            if (source.File != null)
            {
                submission.Papers = new List<Paper>()
                {
                    new Paper()
                    {
                        File = source.File.ToBytes(),
                        FileName = source.File.FileName,
                        SubmissionId = source.Id,
                    }
                };
            }

            return submission;
        }
    }
}
