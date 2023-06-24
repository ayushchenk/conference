using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Domain.Enums;
using Microsoft.AspNetCore.Http;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandMapper : IMapper<CreateSubmissionCommand, Submission>
    {
        public Submission Map(CreateSubmissionCommand source)
        {
            var submission = new Submission()
            {
                Abstract = source.Abstract,
                ConferenceId = source.ConferenceId,
                Keywords = source.Keywords,
                Title = source.Title,
                Status = SubmissionStatus.Created,
                ResearchAreas = string.Join(Conference.ResearchAreasSeparator, source.ResearchAreas),
                Papers = new List<Paper>()
                {
                    MapPaper(source.MainFile, PaperType.Main)
                }
            };

            if (source.AnonymizedFile != null)
            {
                submission.Papers.Add(MapPaper(source.AnonymizedFile, PaperType.Anonymized));
            }

            if (source.PresentationFile != null)
            {
                submission.Papers.Add(MapPaper(source.PresentationFile, PaperType.Presentation));
            }

            if (source.OtherFiles != null && source.OtherFiles.Any())
            {
                foreach (var file in source.OtherFiles)
                {
                    submission.Papers.Add(MapPaper(file, PaperType.Other));
                }
            }

            return submission;
        }

        private Paper MapPaper(IFormFile file, PaperType type)
        {
            return new Paper()
            {
                SubmissionId = 0,
                File = file.ToBytes(),
                FileName = file.FileName,
                Type = type
            };
        }
    }
}
