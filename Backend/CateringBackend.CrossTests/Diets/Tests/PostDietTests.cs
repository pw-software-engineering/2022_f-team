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
            var response = await DietsActions.PostDietWithMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostDiet_DelivererLoggedIn_ReturnsUnauthorized()
        {
            await DelivererActions.Login(_httpClient);
            var response = await DietsActions.PostDietWithMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostDiet_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var response = await DietsActions.PostDietWithMeals(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var getResponse = await DietsActions.GetDiets(_httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var diets = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getContent);
            Assert.NotEmpty(diets);
        }

        [Fact]
        public async Task PostDiet_ClientLoggedIn_ReturnsOk()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await DietsActions.PostDietWithMeals(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var getResponse = await DietsActions.GetDiets(_httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var diets = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getContent);
            Assert.NotEmpty(diets);
        }

        [Fact]
        public async Task PostDiet_DietWithNoMeals_ReturnsBadRequest()
        {
            await ProducerActions.Login(_httpClient);
            var response = await DietsActions.PostDietWithMeals(_httpClient, false);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
