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

namespace CateringBackend.CrossTests.Meals.Tests
{
    public class GetMealTests
    {
        private readonly HttpClient _httpClient;

        public GetMealTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task GetMeal_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await MealsActions.GetMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetMeal_DelivererLoggedIn_ReturnsUnauthorized()
        {
            await DelivererActions.Login(_httpClient);
            var response = await MealsActions.GetMeal(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var response = await MealsActions.GetMeal(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetMeal_ClientLoggedIn_ReturnsOk()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await MealsActions.GetMeal(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
