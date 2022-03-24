using CateringBackend.Controllers;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Utilities;
using CateringBackend.Clients.Queries;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CateringBackEndUnitTests
{
    public class ClientControllerClientLoginTests
    {
        private readonly ClientController _clientController;
        private readonly Mock<IMediator> _mockedMediator;

        public ClientControllerClientLoginTests()
        {
            _mockedMediator = new Mock<IMediator>();
            _clientController = new ClientController(_mockedMediator.Object);
        }

        [Fact]
        public async void WhenLoginUserQueryIsPassed_ThenItIsSentToMediator()
        {
            // Arrange
            var loginQuery = new ClientLoginQuery
            {
                Email = "testEmail",
                Password = "testPassword"
            };

            _mockedMediator
                .Setup(x => x.Send(It.IsAny<ClientLoginQuery>(), It.IsAny<CancellationToken>()))
                .Verifiable("Client login query was not sent");

            // Act 
            await _clientController.LoginUser(loginQuery);

            // Assert
            _mockedMediator.Verify(x => x.Send(It.IsAny<ClientLoginQuery>(), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Theory]
        [InlineData("not empty string as token", (int)HttpStatusCode.OK)]
        [InlineData("", (int)HttpStatusCode.BadRequest)]
        [InlineData("   ", (int)HttpStatusCode.BadRequest)]
        [InlineData(null, (int)HttpStatusCode.BadRequest)]
        public async void WhenProperLoginUserQueryIsPassed_ShouldSendItWithMediator_(string mediatorResult, int expectedStatusCode)
        {
            // Arrange
            _mockedMediator
                .Setup(x => x.Send(It.IsAny<ClientLoginQuery>(), It.IsAny<CancellationToken>()))
                .Returns(Task.FromResult(mediatorResult))
                .Verifiable("Client login query was not sent");

            // Act 
            var result = await _clientController.LoginUser(new ClientLoginQuery());
            var okResult = result as ObjectResult;

            Assert.NotNull(okResult);
            Assert.Equal(expectedStatusCode, okResult.StatusCode);
        }

    }
}
