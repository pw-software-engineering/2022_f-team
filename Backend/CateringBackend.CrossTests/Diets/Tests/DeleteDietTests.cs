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

namespace CateringBackend.CrossTests.Diets.Tests
{
    public class DeleteDietTests
    {
        private readonly HttpClient _httpClient;

        public DeleteDietTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task DeleteDiet_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await DietsActions.DeleteDiet(_httpClient, TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task DeleteDiet_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await DietsActions.DeleteDiet(_httpClient, TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        //[Fact]
        //public async Task DeleteDiet_ProducerLoggedIn_ReturnsOk()
        //{
        //    await ProducerActions.Login(_httpClient);
        //    var dietIds = await DietsActions.GetDietsIds(_httpClient);
        //    var response = await DietsActions.DeleteDiet(_httpClient, dietIds.First());
        //    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //    var dietIdsAfterDelete = await DietsActions.GetDietsIds(_httpClient);
        //    Assert.True(!dietIdsAfterDelete.Contains(dietIds.First()));
        //}

        [Fact]
        public async Task DeleteDiet_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await DietsActions.DeleteDiet(_httpClient, TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task DeleteDiet_InvalidId_ReturnsNotFound()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await DietsActions.DeleteDiet(_httpClient, TestsConstants.GetDefaultId());
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
