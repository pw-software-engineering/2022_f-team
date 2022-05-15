using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using CateringBackend.CrossTests.Utilities;
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
            var mealIds = await MealsActions.PostAndGetMealIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var mealIds = await MealsActions.PostAndGetMealIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Authorize(_httpClient);
            var mealIds = await MealsActions.PostAndGetMealIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var mealIdsAfterDelete = await MealsActions.GetMealsIds(_httpClient);
            Assert.True(!mealIdsAfterDelete.Contains(mealIds.First()));
        }

        [Fact]
        public async Task DeleteMeal_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var mealIds = await MealsActions.GetMealsIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_InvalidId_ReturnsNotFound()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
