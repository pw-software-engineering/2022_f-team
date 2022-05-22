using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Diets.Tests
{
    public class PostDietTests
    {
        private readonly HttpClient _httpClient;

        public PostDietTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task PostDiet_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await DietsActions.PostDiet(_httpClient, Array.Empty<object>());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostDiet_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await DietsActions.PostDiet(_httpClient, Array.Empty<object>());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PostDiet_ProducerLoggedIn_ReturnsCreated()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await DietsActions.PostDietWithMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var diets = await DietsActions.GetDietsIds(_httpClient);
            Assert.NotEmpty(diets);
        }

        [Fact]
        public async Task PostDiet_ClientLoggedIn_ReturnsCreated()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await DietsActions.PostDietWithMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            var diets = await DietsActions.GetDietsIds(_httpClient);
            Assert.NotEmpty(diets);
        }
    }
}
