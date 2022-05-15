using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using CateringBackend.CrossTests.Utilities;
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
        public async Task PutMeal_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PutMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task PutMeal_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await MealsActions.PutMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PutMeal_InvalidId_ReturnsNotFound()
        {
            await ProducerActions.Authorize(_httpClient);
            var putRequest = MealsRequestsProvider.PrepareMeals(1).First();
            putRequest.MealId = (string)TestsConstants.GetDefaultId();
            var putBody = JsonConvert.SerializeObject(putRequest).ToStringContent();
            var response = await _httpClient.PutAsync(MealsUrls.GetMealUrl(TestsConstants.GetDefaultId()), putBody);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        
    }
}
