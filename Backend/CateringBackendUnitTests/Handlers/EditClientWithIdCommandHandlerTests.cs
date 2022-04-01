using System;
using System.Linq;
using System.Threading;
using CateringBackend.Clients.Commands;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Utilities;
using CateringBackend.Exceptions;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CateringBackendUnitTests.Handlers
{
    public class EditClientWithIdCommandHandlerTests
    {
        private readonly CateringDbContext _dbContext;
        private readonly EditClientWithIdCommandHandler _editClientWithIdCommandHandler;

        public EditClientWithIdCommandHandlerTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
            _editClientWithIdCommandHandler = new EditClientWithIdCommandHandler(_dbContext);
        }

        [Fact]
        public async void GivenEditClientWithIdCommand_WhenHandleForNotExistingClient_ThenReturnsFalse()
        {
            // Arrange
            var clientId = Guid.NewGuid();
            var request = new EditClientWithIdCommand(new EditClientCommand(), clientId);

            // Act
            var result = await _editClientWithIdCommandHandler.Handle(request, CancellationToken.None);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async void GivenEditClientWithIdCommand_WhenHandleForExistingClientWithoutAddress_ThenThrowsMissingAddressForClientException()
        {
            // Arrange
            var addedClientWithoutAddress = _dbContext.Clients.Add(new Client()).Entity;
            await _dbContext.SaveChangesAsync(CancellationToken.None);

            var editClientAddress = new RegisterClientAddress { City = "editedCity" };
            var editClientCommand = new EditClientCommand { Address = editClientAddress };
            var editClientWithIdCommand = new EditClientWithIdCommand(editClientCommand, addedClientWithoutAddress.Id);

            // Act & Assert
            await Assert.ThrowsAsync<MissingAddressForClientException>(
                async () => await _editClientWithIdCommandHandler.Handle(editClientWithIdCommand,
                    CancellationToken.None));
        }

        [Theory]
        [MemberData(nameof(EditClientWithIdCommandHandlerTestsData.GetEditClientCommandAndClient),
            MemberType = typeof(EditClientWithIdCommandHandlerTestsData))]
        public async void GivenEditClientWithIdCommand_WhenHandleForExistingClient_ThenDataInDatabaseShouldBeChangedAsExpected(string description, Client clientToAddToDatabase, EditClientCommand editClientCommand)
        {
            // Arrange
            var addedClient = _dbContext.Clients.Add(new Client(clientToAddToDatabase)).Entity;
            await _dbContext.SaveChangesAsync();

            // Act
            await _editClientWithIdCommandHandler.Handle(new EditClientWithIdCommand(editClientCommand, addedClient.Id), CancellationToken.None);

            // Assert
            AssertClientData(clientToAddToDatabase, editClientCommand);
        }

        private void AssertClientData(Client clientToAddToDatabase, EditClientCommand editClientCommand)
        {
            var clientInDatabase = _dbContext.Clients.First();

            var expectedName = string.IsNullOrWhiteSpace(editClientCommand.Name) ? clientToAddToDatabase.FirstName : editClientCommand.Name;
            var expectedLastName = string.IsNullOrWhiteSpace(editClientCommand.LastName) ? clientToAddToDatabase.LastName : editClientCommand.LastName;
            var expectedPassword = string.IsNullOrWhiteSpace(editClientCommand.Password) ? clientToAddToDatabase.Password : PasswordManager.Encrypt(editClientCommand.Password);
            var expectedPhoneNumber = string.IsNullOrWhiteSpace(editClientCommand.PhoneNumber) ? clientToAddToDatabase.PhoneNumber : editClientCommand.PhoneNumber;
            var expectedCity = string.IsNullOrWhiteSpace(editClientCommand.Address?.City) ? clientToAddToDatabase.Address?.City : editClientCommand.Address?.City;
            var expectedApartmentNumber =
                string.IsNullOrWhiteSpace(editClientCommand.Address?.ApartmentNumber) ?
                    clientToAddToDatabase.Address?.ApartmentNumber : editClientCommand.Address?.ApartmentNumber;
            var expectedBuildingNumber = string.IsNullOrWhiteSpace(editClientCommand.Address?.BuildingNumber) ? clientToAddToDatabase.Address?.BuildingNumber : editClientCommand.Address?.BuildingNumber;
            var expectedPostCode = string.IsNullOrWhiteSpace(editClientCommand.Address?.PostCode) ? clientToAddToDatabase.Address?.PostCode : editClientCommand.Address?.PostCode;
            var expectedStreet = string.IsNullOrWhiteSpace(editClientCommand.Address?.Street) ? clientToAddToDatabase.Address?.Street : editClientCommand.Address?.Street;

            Assert.Equal(expectedName, clientInDatabase.FirstName);
            Assert.Equal(expectedLastName, clientInDatabase.LastName);
            Assert.Equal(expectedPassword, clientInDatabase.Password);
            Assert.Equal(expectedPhoneNumber, clientInDatabase.PhoneNumber);
            Assert.Equal(expectedCity, clientInDatabase.Address?.City);
            Assert.Equal(expectedApartmentNumber, clientInDatabase.Address?.ApartmentNumber);
            Assert.Equal(expectedBuildingNumber, clientInDatabase.Address?.BuildingNumber);
            Assert.Equal(expectedPostCode, clientInDatabase.Address?.PostCode);
            Assert.Equal(expectedStreet, clientInDatabase.Address?.Street);
        }
    }
}
