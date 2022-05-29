using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Producer.Tests
{
    public class OrdersTests
    {
        private readonly HttpClient _httpClient;

        public OrdersTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task GetOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.GetAsync(ProducerUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetOrders_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.GetAsync(ProducerUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task GetOrders_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.GetAsync(ProducerUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task GetOrders_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await _httpClient.GetAsync(ProducerUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetComplaints_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.GetAsync(ProducerUrls.GetComplaintsUrl());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetComplaints_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.GetAsync(ProducerUrls.GetComplaintsUrl());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task GetComplaints_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.GetAsync(ProducerUrls.GetComplaintsUrl());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task GetComplaints_ProducertLoggedIn_ReturnsOk()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await _httpClient.GetAsync(ProducerUrls.GetComplaintsUrl());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task PostOrderComplete_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.PostAsync(ProducerUrls.GetOrderCompleteUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostOrderComplete_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.PostAsync(ProducerUrls.GetOrderCompleteUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PostOrderComplete_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.PostAsync(ProducerUrls.GetOrderCompleteUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PostOrderComplete_InvalidOrderId_ReturnsNotFound()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await _httpClient.PostAsync(ProducerUrls.GetOrderCompleteUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        //[Fact]
        //public async Task PostOrderComplete_ProducerLoggedIn_ReturnsOk()
        //{
        //    var postResponse = await ClientActions.CreateOrders(_httpClient);
        //    var getResponse = await ClientActions.GetOrders(_httpClient, false);
        //    var orders = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getResponse.Content.ReadAsStringAsync().Result);
        //    await ProducerActions.Authorize(_httpClient);
        //    var response = await _httpClient.GetAsync(ProducerUrls.GetOrderCompleteUrl(new Guid()));
        //    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //}

        [Fact]
        public async Task PostComplaintAnswer_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.PostAsync(ProducerUrls.GetAnswerComplaintUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PostComplaintAnswer_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.PostAsync(ProducerUrls.GetAnswerComplaintUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task PostComplaintAnswer_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.PostAsync(ProducerUrls.GetAnswerComplaintUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        //[Fact]
        //public async Task PostComplaintAnswer_ClientLoggedIn_ReturnsOk()
        //{
        //    var orderIds = await ClientActions.CreateOrderAndReturnId(_httpClient);

        //    var sendResponse = await ClientActions.SendComplain(_httpClient, orderIds.First());

        //    await ProducerActions.Authorize(_httpClient);
        //    var complaintIds = await ProducerActions.GetComplaintIds(_httpClient);
        //    var answerRequest = ProducerRequestsProvider.PrepareAnswerComplaintRequest();
        //    var postBody = JsonConvert.SerializeObject(answerRequest).ToStringContent();
        //    var response = await _httpClient.PostAsync(ProducerUrls.GetAnswerComplaintUrl(complaintIds.First()), postBody);
        //    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //}

        [Fact]
        public async Task PostComplaintAnswer_InvalidComplaintId_ReturnsNotFound()
        {
            await ProducerActions.Authorize(_httpClient);
            var answerRequest = ProducerRequestsProvider.PrepareAnswerComplaintRequest();
            var postBody = JsonConvert.SerializeObject(answerRequest).ToStringContent();
            var response = await _httpClient.PostAsync(ProducerUrls.GetAnswerComplaintUrl(new Guid()), postBody);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
