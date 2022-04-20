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
    public class GetMealsTests
    {
        private readonly HttpClient _httpClient;

        public GetMealsTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task GetMeals_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await MealsActions.GetMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetMeals_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Login(_httpClient);
            var response = await MealsActions.GetMeals(_httpClient);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task GetMeals_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Login(_httpClient);
            var response = await MealsActions.GetMeals(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetMeals_ClientLoggedIn_ReturnsOk()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await MealsActions.GetMeals(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
