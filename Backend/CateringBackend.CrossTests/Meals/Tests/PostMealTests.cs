using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Meals.Tests
{
    public class PostMealTests
    {
        private readonly HttpClient _httpClient;

        public PostMealTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task PostMeal_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await MealsActions.PostMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostMeal_DelivererLoggedIn_ReturnsUnauthorized()
        {
            await DelivererActions.Login(_httpClient);
            var response = await MealsActions.PostMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var response = await MealsActions.PostMeals(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var getResponse = await MealsActions.GetMeals(_httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var Meals = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getContent);
            Assert.NotEmpty(Meals);
        }

        [Fact]
        public async Task PostMeal_ClientLoggedIn_ReturnsUnauthorized()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await MealsActions.PostMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostMeal_MealsWithNoId_ReturnsBadRequest()
        {
            await ProducerActions.Login(_httpClient);
            var response = await MealsActions.PostMeals(_httpClient, false);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
