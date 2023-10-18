using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Core.Conferences.Join;
using ConferenceManager.Domain.Entities;
using MediatR;

namespace ConferenceManager.Core.User.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, AuthResponse>
    {
        private readonly IMapper<RegisterUserCommand, ApplicationUser> _mapper;
        private readonly IIdentityService _identityService;
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;

        public RegisterUserCommandHandler(
            IMapper<RegisterUserCommand, ApplicationUser> mapper,
            IIdentityService identityService,
            IApplicationDbContext context,
            IMediator mediator
            )
        {
            _mapper = mapper;
            _identityService = identityService;
            _context = context;
            _mediator = mediator;
        }

        public async Task<AuthResponse> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            using var transaction = _context.Database.BeginTransaction();

            var user = _mapper.Map(request);

            await _identityService.CreateUser(user, request.Password);

            if (!string.IsNullOrEmpty(request.InviteCode))
            {
                await _mediator.Send(new JoinConferenceCommand()
                {
                    UserId = user.Id,
                    Code = request.InviteCode
                });
            }

            var result = await _identityService.Authenticate(new TokenRequest()
            {
                Email = request.Email,
                Password = request.Password
            });

            transaction.Commit();

            return result;
        }
    }
}
