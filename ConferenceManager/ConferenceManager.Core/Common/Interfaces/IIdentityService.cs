using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<AuthResponse> Authenticate(AuthRequest tokenRequest);

        void SignOut();

        AuthResponse GenerateToken(ApplicationUser user);

        Task CreateUser(ApplicationUser user, string password);

        Task DeleteUser(int id);
    }
}
