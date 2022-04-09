using CateringBackend.CrossTests.Client.Requests;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Client.Tests
{
    public class AccountTests
    {

        private readonly HttpClient _httpClient;

        public AccountTests()
        {
            _httpClient = new HttpClient();
        }
        [Fact]
        public async Task GetClientDetails_IsLoggedIn_ReturnsOK()
        {
            var clientData = await ClientHelpers.RegisterAndLogin(_httpClient);
            var getResponse = await _httpClient.GetAsync(ClientHelpers.GetAccountUrl());
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
            var clientGetData = JsonConvert.DeserializeObject<RegisterRequest>(getResponse.Content.ReadAsStringAsync().Result);
            Assert.Equal(clientData, clientGetData);
        }

        [Fact]
        public async Task GetClientDetails_NotLoggedIn_ReturnsUnauthorized()
        {
            var getResponse = await _httpClient.GetAsync(ClientHelpers.GetAccountUrl());
            Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        }
        [Fact]
        public async void UpdateClientDetails_ProvidedCompleteData_ReturnsOK()
        {
            var clientData = await ClientHelpers.RegisterAndLogin(_httpClient);
            var request = ClientHelpers.PrepareEditClientRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            var response = await _httpClient.PutAsync(ClientHelpers.GetAccountUrl(), body);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            var getResponse = await _httpClient.GetAsync(ClientHelpers.GetAccountUrl());
            var clientGetData = JsonConvert.DeserializeObject<EditClientRequest>(getResponse.Content.ReadAsStringAsync().Result);
            Assert.Equal(request, clientGetData);
        }

        [Fact]
        public async void UpdateClientDetails_NotLoggedIn_ReturnsUnauthorized()
        {
            var request = ClientHelpers.PrepareEditClientRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            var response = await _httpClient.PutAsync(ClientHelpers.GetAccountUrl(), body);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        //[Fact]
        //public async void UpdateClientDetails_ProvidedInCompleteData_ReturnsBadRequest()
        //{
        //    await ClientHelpers.RegisterAndLogin(_httpClient);
        //    var request = ClientHelpers.PrepareEditClientRequest(false);
        //    var body = JsonConvert.SerializeObject(request).ToStringContent();
        //    var response = await _httpClient.PutAsync(ClientHelpers.GetAccountUrl(), body);
        //    Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        //}
    }
}
