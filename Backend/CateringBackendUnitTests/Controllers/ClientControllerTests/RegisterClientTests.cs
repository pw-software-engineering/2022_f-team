using System.Net;
using System.Threading;
using System.Threading.Tasks;
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

        public RegisterClientTests()
        {
            _mockedMediator = new Mock<IMediator>();
            _clientController = new ClientController(_mockedMediator.Object);
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
        [InlineData("not empty string as token", (int)HttpStatusCode.Created)]
        [InlineData("", (int)HttpStatusCode.BadRequest)]
        [InlineData("   ", (int)HttpStatusCode.BadRequest)]
        [InlineData(null, (int)HttpStatusCode.BadRequest)]
        public async void WhenLoginUser_ThenBasedOnMediatorResult_ShouldReturnProperStatusCode(string mediatorResult, int expectedStatusCode)
        {
            // Arrange
            _mockedMediator
                .Setup(x => x.Send(It.IsAny<RegisterClientCommand>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mediatorResult))
                .Verifiable("Register client query was not sent");

            // Act 
            var result = await _clientController.RegisterClient(new RegisterClientCommand());
            var okResult = result as ObjectResult;

            // Assert
            Assert.NotNull(okResult);
            Assert.Equal(expectedStatusCode, okResult.StatusCode);
        }
    }
}
