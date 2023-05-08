using ConferenceManager.Core.Common.Model.Token;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface ITokenService
    {
        Task<TokenResponse> Authenticate(TokenRequest tokenRequest);
    }
}
