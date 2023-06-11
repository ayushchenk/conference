using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Domain.Enums;
using Microsoft.AspNetCore.Http;

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
                Status = SubmissionStatus.Updated,
                Papers = new List<Paper>()
            };

            if (source.MainFile != null)
            {
                submission.Papers.Add(MapPaper(source.MainFile, source.Id, PaperType.Main));
            }

            if (source.AnonymizedFile != null)
            {
                submission.Papers.Add(MapPaper(source.AnonymizedFile, source.Id, PaperType.Anonymized));
            }

            if (source.PresentationFile != null)
            {
                submission.Papers.Add(MapPaper(source.PresentationFile, source.Id, PaperType.Presentation));
            }

            if (source.OtherFiles != null && source.OtherFiles.Any())
            {
                foreach (var file in source.OtherFiles)
                {
                    submission.Papers.Add(MapPaper(file, source.Id, PaperType.Other));
                }
            }

            return submission;
        }

        private Paper MapPaper(IFormFile file, int submissionId, PaperType type)
        {
            return new Paper()
            {
                SubmissionId = submissionId,
                File = file.ToBytes(),
                FileName = file.FileName,
                Type = type
            };
        }
    }
}
