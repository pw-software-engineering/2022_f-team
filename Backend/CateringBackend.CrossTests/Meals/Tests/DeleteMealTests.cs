using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
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
    public class DeleteMealTests
    {
        private readonly HttpClient _httpClient;

        public DeleteMealTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task DeleteMeal_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await MealsActions.DeleteMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_DelivererLoggedIn_ReturnsUnauthorized()
        {
            await DelivererActions.Login(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var MealIds = await MealsActions.GetMealsIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, MealIds.First());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var MealIdsAfterDelete = await MealsActions.GetMealsIds(_httpClient);
            Assert.True(!MealIdsAfterDelete.Contains(MealIds.First()));
        }

        [Fact]
        public async Task DeleteMeal_ClientLoggedIn_ReturnsUnauthorized()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_MealWithNoMeals_ReturnsNotFound()
        {
            await ProducerActions.Login(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, "-1");
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}
