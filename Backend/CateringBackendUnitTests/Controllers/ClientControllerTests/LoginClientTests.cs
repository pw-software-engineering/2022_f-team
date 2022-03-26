using System.Net;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Clients.Queries;
using CateringBackend.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CateringBackendUnitTests.Controllers.ClientControllerTests
{
    public class LoginClientTests
    {
        private readonly ClientController _clientController;
        private readonly Mock<IMediator> _mockedMediator;
        private readonly Mock<IUserIdFromTokenProvider> _mockedUserIdFromTokenProvider;

        public LoginClientTests()
        {
            _mockedUserIdFromTokenProvider = new Mock<IUserIdFromTokenProvider>();
            _mockedMediator = new Mock<IMediator>();
            _clientController = new ClientController(_mockedMediator.Object, _mockedUserIdFromTokenProvider.Object);
        }

        [Fact]
        public async void WhenLoginUserQueryIsPassed_ThenItIsSentToMediator()
        {
            // Arrange
            var loginQuery = new LoginClientQuery
            {
                Email = "testEmail",
                Password = "testPassword"
            };

            _mockedMediator
                .Setup(x => x.Send(It.IsAny<LoginClientQuery>(), It.IsAny<CancellationToken>()))
                .Verifiable("Login client query was not sent");

            // Act 
            await _clientController.LoginClient(loginQuery);

            // Assert
            _mockedMediator.Verify(x => x.Send(It.IsAny<LoginClientQuery>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Theory]
        [InlineData("not empty string as token", (int)HttpStatusCode.OK)]
        [InlineData("", (int)HttpStatusCode.BadRequest)]
        [InlineData("   ", (int)HttpStatusCode.BadRequest)]
        [InlineData(null, (int)HttpStatusCode.BadRequest)]
        public async void WhenLoginUser_ThenBasedOnMediatorResult_ShouldReturnProperStatusCode(string mediatorResult, int expectedStatusCode)
        {
            // Arrange
            _mockedMediator
                .Setup(x => x.Send(It.IsAny<LoginClientQuery>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mediatorResult))
                .Verifiable("Client login query was not sent");

            // Act 
            var result = await _clientController.LoginClient(new LoginClientQuery());
            var okResult = result as ObjectResult;

            // Assert
            Assert.NotNull(okResult);
            Assert.Equal(expectedStatusCode, okResult.StatusCode);
        }
    }
}
