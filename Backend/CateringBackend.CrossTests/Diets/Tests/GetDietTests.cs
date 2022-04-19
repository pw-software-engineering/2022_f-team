using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Diets.Tests
{
    public class GetDietTests
    {
        private readonly HttpClient _httpClient;

        public GetDietTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task GetDiet_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await DietsActions.GetDiet(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetDiet_DelivererLoggedIn_ReturnsUnauthorized()
        {
            await DelivererActions.Login(_httpClient);
            var response = await DietsActions.GetDiet(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetDiet_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var response = await DietsActions.GetDiet(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetDiet_ClientLoggedIn_ReturnsOk()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await DietsActions.GetDiet(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
