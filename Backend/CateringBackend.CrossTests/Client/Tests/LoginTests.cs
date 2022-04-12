using System.Net;
using System.Net.Http;
using Xunit;

namespace CateringBackend.CrossTests.Client.Tests
{
    public class LoginTests
    {
        private readonly HttpClient _httpClient;

        public LoginTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async void LoginClient_HasCorrectData_ReturnsOK()
        {
            var request = ClientRequestsProvider.PrepareRegisterRequest();
            await ClientActions.Register(_httpClient, request);

            var loginRequest = ClientRequestsProvider.PrepareLoginRequest(request);
            var response = await ClientActions.Login(_httpClient, loginRequest);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async void LoginClient_HasIncorrectPassword_ReturnsBadRequest()
        {
            var request = ClientRequestsProvider.PrepareRegisterRequest();
            await ClientActions.Register(_httpClient, request);

            var loginRequest = ClientRequestsProvider.PrepareLoginRequest(request, false);
            var response = await ClientActions.Login(_httpClient, loginRequest);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
