using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Clients.Commands;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Utilities;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CateringBackendUnitTests.Handlers
{
    public class RegisterClientCommandHandlerTests
    {
        private readonly CateringDbContext _dbContext;

        public RegisterClientCommandHandlerTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
        }

        [Fact]
        public async Task WhenClientWithGivenEmailAlreadyExists_ThenRegisterClientCommandHandler_ShouldReturnNull()
        {
            // Arrange
            const string testEmail = "test@mail.com";

            _dbContext.Clients.Add(new Client
            {
                Email = testEmail,
            });
            await _dbContext.SaveChangesAsync();

            var registerClientCommandHandler = new RegisterClientCommandHandler(_dbContext);

            var registerClientCommand = new RegisterClientCommand
            {
                Email = testEmail
            };

            // Act
            var result = await registerClientCommandHandler.Handle(registerClientCommand, CancellationToken.None);

            // Assert
            Assert.Null(result);
        }

        [Theory]
        [MemberData(nameof(RegisterClientCommandHandlerTestsData.GetValidRegisterClientCommands),
            MemberType = typeof(RegisterClientCommandHandlerTestsData))]
        public async Task WhenRegisterClient_ThenRegisterClientCommandHandler_ShouldAddCorrectAddressToDatabase(
            RegisterClientCommand registerClientCommand)
        {
            // Arrange
            var registerClientCommandHandler = new RegisterClientCommandHandler(_dbContext);

            // Act
            await registerClientCommandHandler.Handle(registerClientCommand, CancellationToken.None);

            // Assert
            AssertAddressAddedToDatabase(_dbContext, registerClientCommand.Address);
        }

        [Theory]
        [MemberData(nameof(RegisterClientCommandHandlerTestsData.GetValidRegisterClientCommands),
            MemberType = typeof(RegisterClientCommandHandlerTestsData))]
        public async Task WhenRegisterClient_ThenRegisterClientCommandHandler_ShouldAddCorrectClientToDatabase(
            RegisterClientCommand registerClientCommand)
        {
            // Arrange
            var registerClientCommandHandler = new RegisterClientCommandHandler(_dbContext);

            // Act
            await registerClientCommandHandler.Handle(registerClientCommand, CancellationToken.None);

            // Assert
            AssertClientAddedToDatabase(_dbContext, registerClientCommand);
        }

        [Theory]
        [MemberData(nameof(RegisterClientCommandHandlerTestsData.GetValidRegisterClientCommands),
            MemberType = typeof(RegisterClientCommandHandlerTestsData))]
        public async Task WhenRegisterClient_ThenRegisterClientCommandHandler_ShouldReturnNotEmptyString(
            RegisterClientCommand registerClientCommand)
        {
            // Arrange
            var registerClientCommandHandler = new RegisterClientCommandHandler(_dbContext);

            // Act
            var result = await registerClientCommandHandler.Handle(registerClientCommand, CancellationToken.None);

            // Assert
            Assert.False(string.IsNullOrWhiteSpace(result));
        }

        private static void AssertAddressAddedToDatabase(CateringDbContext dbContext,
            RegisterClientAddress registerClientAddress)
        {
            Assert.Equal(1, dbContext.Addresses.Count());
            var addedAddress = dbContext.Addresses.First();
            Assert.Equal(registerClientAddress.City, addedAddress.City);
            Assert.Equal(registerClientAddress.Street, addedAddress.Street);
            Assert.Equal(registerClientAddress.BuildingNumber, addedAddress.BuildingNumber);
            Assert.Equal(registerClientAddress.ApartmentNumber, addedAddress.ApartmentNumber);
            Assert.Equal(registerClientAddress.PostCode, addedAddress.PostCode);
        }

        private static void AssertClientAddedToDatabase(CateringDbContext dbContext,
            RegisterClientCommand registerClientAddress)
        {
            Assert.Equal(1, dbContext.Clients.Count());
            var addedClient = dbContext.Clients.First();
            Assert.Equal(registerClientAddress.Name, addedClient.FirstName);
            Assert.Equal(registerClientAddress.LastName, addedClient.LastName);
            Assert.Equal(registerClientAddress.Email, addedClient.Email);
            Assert.Equal(registerClientAddress.Password, PasswordManager.Decrypt(addedClient.Password));
            Assert.Equal(registerClientAddress.PhoneNumber, addedClient.PhoneNumber);
        }
    }
}
