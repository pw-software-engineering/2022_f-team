using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;


namespace CateringBackend.CrossTests.Client.Tests
{
    public class OrdersTests
    {
        private readonly HttpClient _httpClient;

        public OrdersTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task GetOrders_IsLoggedIn_ReturnsOK()
        {
            var getResponse = await ClientHelpers.GetOrders(_httpClient);
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
            var orders = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getResponse.Content.ReadAsStringAsync().Result);
            Assert.Empty(orders);
        }

        [Fact]
        public async Task GetOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var getResponse = await ClientHelpers.GetOrders(_httpClient, false);
            Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        }

        [Fact]
        public async Task SendOrders_ProvidedCompleteData_ReturnsOK()
        {
            var postResponse = await ClientHelpers.CreateOrders(_httpClient);
            Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);

            var getResponse = await ClientHelpers.GetOrders(_httpClient, false);
            var orders = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getResponse.Content.ReadAsStringAsync().Result);
            Assert.NotEmpty(orders);
        }

        [Fact]
        public async Task SendOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var getResponse = await ClientHelpers.CreateOrders(_httpClient, isValid: true, authorize: false);
            Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        }

        [Fact]
        public async Task SendComplain_CorrectData_ReturnsCreated()
        {
            var orderIds = await ClientHelpers.CreateOrderAndReturnId(_httpClient);

            var response = await ClientHelpers.SendComplain(_httpClient, orderIds.First());
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task SendComplain_NotLoggedIn_ReturnsUnauthorized()
        {
            var orderIds = await ClientHelpers.CreateOrderAndReturnId(_httpClient);
            _httpClient.RemoveAuthorization();

            var response = await ClientHelpers.SendComplain(_httpClient, orderIds.First());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task SendComplain_InvalidOrderId_ReturnsNotFound()
        {
            await ClientHelpers.CreateOrderAndReturnId(_httpClient);
            var invalidId = -1;

            var response = await ClientHelpers.SendComplain(_httpClient, invalidId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_ValidOrderId_ReturnsCreated()
        {
            var orderIds = await ClientHelpers.CreateOrderAndReturnId(_httpClient);
            var response = await ClientHelpers.PayOrder(_httpClient, orderIds.First());
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_NotLoggedIn_Unauthorized()
        {
            var orderIds = await ClientHelpers.CreateOrderAndReturnId(_httpClient);
            _httpClient.RemoveAuthorization();
            var response = await ClientHelpers.PayOrder(_httpClient, orderIds.First());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_InvalidOrderId_ReturnsNotFound()
        {
            await ClientHelpers.CreateOrderAndReturnId(_httpClient);
            var invalidId = -1;
            var response = await ClientHelpers.PayOrder(_httpClient, invalidId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
