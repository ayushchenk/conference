using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Queries;
using FluentValidation;

namespace ConferenceManager.Core.Common.Validators
{
    public class EntityPageQueryValidator<T> : AbstractValidator<GetEntityPageQuery<T>> where T : IDto
    {
        public EntityPageQueryValidator()
        {
            RuleFor(x => x.PageIndex)
                .GreaterThanOrEqualTo(0).WithMessage("PageIndex should be greater than or equal to 0");

            RuleFor(x => x.PageSize)
                .GreaterThanOrEqualTo(0).WithMessage("PageSize should be greater than or equal to 0");
        }
    }
}
