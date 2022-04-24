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
    public class LoginTests
    {
        private readonly HttpClient _httpClient;

        public LoginTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async void LoginClient_HasCorrectData_ReturnsOK()
        {
            var response = await ProducerActions.Login(_httpClient);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async void LoginClient_HasIncorrectPassword_ReturnsBadRequest()
        {
            var response = await ProducerActions.Login(_httpClient, false);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
