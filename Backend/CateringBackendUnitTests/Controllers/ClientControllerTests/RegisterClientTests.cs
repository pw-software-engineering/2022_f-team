using System.Net;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Clients.Commands;
using CateringBackend.Controllers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CateringBackendUnitTests.Controllers.ClientControllerTests
{
    public class RegisterClientTests
    {
        private readonly ClientController _clientController;
        private readonly Mock<IMediator> _mockedMediator;
        private readonly Mock<IUserIdFromTokenProvider> _mockedUserIdFromTokenProvider;

        public RegisterClientTests()
        {
            _mockedMediator = new Mock<IMediator>();
            _mockedUserIdFromTokenProvider = new Mock<IUserIdFromTokenProvider>();
            _clientController = new ClientController(_mockedMediator.Object, _mockedUserIdFromTokenProvider.Object);
        }

        [Fact]
        public async void WhenRegisterUserQueryIsPassed_ThenItIsSentToMediator()
        {
            // Arrange
            var registerClientCommand = new RegisterClientCommand();

            _mockedMediator
                .Setup(x => x.Send(It.IsAny<RegisterClientCommand>(), It.IsAny<CancellationToken>()))
                .Verifiable("Register client query was not sent");

            // Act 
            await _clientController.RegisterClient(registerClientCommand);

            // Assert
            _mockedMediator.Verify(x => x.Send(It.IsAny<RegisterClientCommand>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Theory]
        [InlineData("not empty string as token", HttpStatusCode.Created)]
        [InlineData("", HttpStatusCode.BadRequest)]
        [InlineData("   ", HttpStatusCode.BadRequest)]
        [InlineData(null, HttpStatusCode.BadRequest)]
        public async void WhenLoginUser_ThenBasedOnMediatorResult_ShouldReturnProperStatusCode(string mediatorResult, HttpStatusCode expectedStatusCode)
        {
            // Arrange
            _mockedMediator
                .Setup(x => x.Send(It.IsAny<RegisterClientCommand>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mediatorResult))
                .Verifiable("Register client query was not sent");

            // Act 
            var result = await _clientController.RegisterClient(new RegisterClientCommand());
            var objectResult = result as ObjectResult;

            // Assert
            Assert.NotNull(objectResult);
            Assert.Equal((int)expectedStatusCode, objectResult.StatusCode);
        }
    }
}
