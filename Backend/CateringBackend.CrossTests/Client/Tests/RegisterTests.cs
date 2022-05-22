﻿using System.Net;
using System.Net.Http;
using Xunit;

namespace CateringBackend.CrossTests.Client.Tests
{
    public class RegisterTests
    {
        private readonly HttpClient _httpClient;

        public RegisterTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async void RegisterClient_HasAllData_ReturnsCreated()
        {
            var request = ClientRequestsProvider.PrepareRegisterRequest();
            var response = await ClientActions.Register(_httpClient, request);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }
    }
}
