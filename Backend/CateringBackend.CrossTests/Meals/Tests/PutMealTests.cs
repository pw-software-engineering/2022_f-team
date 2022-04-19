using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using ExpectedObjects;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Meals.Tests
{
    public class PutMealTests
    {
        private readonly HttpClient _httpClient;

        public PutMealTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task PutMeal_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PutMeal_DelivererLoggedIn_ReturnsUnauthorized()
        {
            await DelivererActions.Login(_httpClient);
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PutMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var getResponse = await MealsActions.GetMeals(_httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var Meals = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getContent);
            Assert.NotEmpty(Meals);
        }

        [Fact]
        public async Task PutMeal_ClientLoggedIn_ReturnsUnauthorized()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PutMeal_MealWithNoId_ReturnsBadRequest()
        {
            await ProducerActions.Login(_httpClient);
            var postResponse = await MealsActions.PostMeals(_httpClient);
            var getResponse = await MealsActions.GetMeals(_httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var Meals = JsonConvert.DeserializeObject<IEnumerable<Meal>>(getContent);
            var response = await MealsActions.PutMeal(_httpClient, false);
            var putContent = await getResponse.Content.ReadAsStringAsync();
            var getUpdatedResponse = await MealsActions.GetMeal(_httpClient, Meals.First().MealId);
            var getUpdatedContent = await getUpdatedResponse.Content.ReadAsStringAsync();
            var updatedItem = JsonConvert.DeserializeObject<Meal>(getUpdatedContent);
            updatedItem.ToExpectedObject().ShouldEqual(true);
        }
    }
}
