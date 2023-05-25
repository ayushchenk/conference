using ConferenceManager.Core.Common.Model.Token;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<TokenResponse> Authenticate(TokenRequest tokenRequest);

        Task<TokenResponse> CreateUser(ApplicationUser user, string password);

        Task DeleteUser(int id);

        Task AssignRole(int id, string role);

        Task UnassignRole(int id, string role);
    }
}
