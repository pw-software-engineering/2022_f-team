﻿using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Producer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Deliverer.Tests
{
    public class OrdersTests
    {
        private readonly HttpClient _httpClient;

        public OrdersTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async void GetOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.GetAsync(DelivererUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async void GetOrders_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.GetAsync(DelivererUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async void GetOrders_ProducerLoggedIn_ReturnsForbidden()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await _httpClient.GetAsync(DelivererUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async void GetOrders_DelivererLoggedIn_ReturnsOk()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.GetAsync(DelivererUrls.GetOrdersUrl());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async void DeliverOrder_NotLoggedIn_ReturnsUnauthorized()
        {
            var response = await _httpClient.PostAsync(DelivererUrls.GetDeliverOrderUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async void DeliverOrder_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var response = await _httpClient.PostAsync(DelivererUrls.GetDeliverOrderUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async void DeliverOrder_ProducerLoggedIn_ReturnsForbidden()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await _httpClient.PostAsync(DelivererUrls.GetDeliverOrderUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async void DeliverOrder_OrderNotCompleted_ReturnsNotFound()
        {
            var orderId = await ClientActions.CreatePaidOrder(_httpClient);
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.PostAsync(DelivererUrls.GetDeliverOrderUrl(orderId), null);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async void DeliverOrder_InvalidOrderId_ReturnsNotFound()
        {
            await DelivererActions.Authorize(_httpClient);
            var response = await _httpClient.PostAsync(DelivererUrls.GetDeliverOrderUrl(new Guid()), null);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
