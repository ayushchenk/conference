using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<TokenResponse> Authenticate(TokenRequest tokenRequest);

        Task CreateUser(ApplicationUser user, string password);

        Task DeleteUser(int id);
    }
}
