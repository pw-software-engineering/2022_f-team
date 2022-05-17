using System;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
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

        //[Fact]
        //public async Task GetOrders_IsLoggedIn_ReturnsOK()
        //{
        //    var getResponse = await ClientActions.GetOrders(_httpClient);
        //    Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        //    var orders = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getResponse.Content.ReadAsStringAsync().Result);
        //    Assert.Empty(orders);
        //}

        //[Fact]
        //public async Task GetOrders_NotLoggedIn_ReturnsUnauthorized()
        //{
        //    var getResponse = await ClientActions.GetOrders(_httpClient, false);
        //    Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        //}

        //[Fact]
        //public async Task GetOrders_ProducerLoggedIn_ReturnsForbidden()
        //{
        //    await ProducerActions.Authorize(_httpClient);
        //    var getResponse = await ClientActions.GetOrders(_httpClient, false);
        //    Assert.Equal(HttpStatusCode.Forbidden, getResponse.StatusCode);
        //}

        //[Fact]
        //public async Task GetOrders_DelivererLoggedIn_ReturnsForbidden()
        //{
        //    await DelivererActions.Authorize(_httpClient);
        //    var getResponse = await ClientActions.GetOrders(_httpClient, false);
        //    Assert.Equal(HttpStatusCode.Forbidden, getResponse.StatusCode);
        //}

        //[Fact]
        //public async Task SendOrders_ProvidedCompleteData_ReturnsOK()
        //{
        //    var postResponse = await ClientActions.CreateOrders(_httpClient);
        //    Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);

        //    var getResponse = await ClientActions.GetOrders(_httpClient, false);
        //    var orders = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getResponse.Content.ReadAsStringAsync().Result);
        //    Assert.NotEmpty(orders);
        //}

        [Fact]
        public async Task SendOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var postResponse = await _httpClient.PostAsync(ClientUrls.GetOrdersUrl(), null);
            Assert.Equal(HttpStatusCode.Unauthorized, postResponse.StatusCode);
        }

        [Fact]
        public async Task SendOrders_ProducerLoggedIn_ReturnsForbidden()
        {
            await ProducerActions.Authorize(_httpClient);
            var postResponse = await _httpClient.PostAsync(ClientUrls.GetOrdersUrl(), null);
            Assert.Equal(HttpStatusCode.Forbidden, postResponse.StatusCode);
        }

        [Fact]
        public async Task SendOrders_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var postResponse = await _httpClient.PostAsync(ClientUrls.GetOrdersUrl(), null);
            Assert.Equal(HttpStatusCode.Forbidden, postResponse.StatusCode);
        }

        //[Fact]
        //public async Task SendComplain_CorrectData_ReturnsCreated()
        //{
        //    var orderIds = await ClientActions.CreateOrderAndReturnId(_httpClient);

        //    var response = await ClientActions.SendComplain(_httpClient, orderIds.First());
        //    Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        //}

        //[Fact]
        //public async Task SendComplain_NotLoggedIn_ReturnsUnauthorized()
        //{
        //    var response = await ClientActions.SendComplain(_httpClient, new Guid().ToString());
        //    Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        //}

        //[Fact]
        //public async Task SendComplain_ProducerLoggedIn_ReturnsUnauthorized()
        //{
        //    await ProducerActions.Authorize(_httpClient);
        //    var response = await ClientActions.SendComplain(_httpClient, new Guid().ToString());
        //    Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        //}

        //[Fact]
        //public async Task SendComplain_DelivererLoggedIn_ReturnsUnauthorized()
        //{
        //    await DelivererActions.Authorize(_httpClient);
        //    var response = await ClientActions.SendComplain(_httpClient, new Guid().ToString());
        //    Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        //}

        //[Fact]
        //public async Task SendComplain_InvalidOrderId_ReturnsNotFound()
        //{
        //    await ClientActions.CreateOrderAndReturnId(_httpClient);

        //    var response = await ClientActions.SendComplain(_httpClient, new Guid().ToString());
        //    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        //}

        //[Fact]
        //public async Task PayOrder_ValidOrderId_ReturnsCreated()
        //{
        //    var orderIds = await ClientActions.CreateOrderAndReturnId(_httpClient);
        //    var response = await ClientActions.PayOrder(_httpClient, orderIds.First());
        //    Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        //}

        [Fact]
        public async Task PayOrder_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await ClientActions.PayOrder(_httpClient, new Guid().ToString());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_ProducerLoggedIn_ReturnsForbidden()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await ClientActions.PayOrder(_httpClient, new Guid().ToString());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await ClientActions.PayOrder(_httpClient, new Guid().ToString());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_InvalidOrderId_ReturnsNotFound()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await ClientActions.PayOrder(_httpClient, new Guid().ToString());
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
