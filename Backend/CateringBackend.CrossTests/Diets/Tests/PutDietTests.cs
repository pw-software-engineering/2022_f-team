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

namespace CateringBackend.CrossTests.Diets.Tests
{
    public class PutDietTests
    {
        private readonly HttpClient _httpClient;

        public PutDietTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task PutDiet_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.PutAsync(DietsUrls.GetDietUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PutDiet_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.PutAsync(DietsUrls.GetDietUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        //[Fact]
        //public async Task PutDiet_ProducerLoggedIn_ReturnsOk()
        //{
        //    await ProducerActions.Authorize(_httpClient);
        //    var response = await DietsActions.PutDiet(_httpClient);
        //    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //    var getResponse = await DietsActions.GetDiets(_httpClient);
        //    var getContent = await getResponse.Content.ReadAsStringAsync();
        //    var diets = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getContent);
        //    Assert.NotEmpty(diets);
        //}

        [Fact]
        public async Task PutDiet_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.PutAsync(DietsUrls.GetDietUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }
    }
}
