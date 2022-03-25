using CateringBackend.Domain.Data;
using CateringBackend.Domain.Utilities;
using CateringBackend.Clients.Queries;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using System;
using Xunit;
using CateringBackend.Domain.Entities;

namespace CateringBackEndUnitTests
{
    public class ClientLoginQueryHandlerTests
    {
        private readonly CateringDbContext _dbContext;

        public ClientLoginQueryHandlerTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
        }

        [Theory]
        [InlineData("client@gmail.com", "client123")]
        public void WhenProvidingCorrectCredentials_ThenReturnJwtToken(string email, string password)
        {
            // Arrange
            _dbContext.Clients.Add(new Client
            {
                Id = new Guid(),
                Email = email,
                Password = PasswordManager.Encrypt(password),
                FirstName = "testFirstName",
                LastName = "testLastName",
                PhoneNumber = "testPhoneNumber",
                AddressId = new Guid()
            });
            _dbContext.SaveChanges();
            var queryHandler = new ClientLoginQueryHandler(_dbContext);

            // Act
            var res = queryHandler.Handle(new ClientLoginQuery
            { Email = email, Password = password }, default);
            res.Wait();

            // Assert
            Assert.NotNull(res.Result);
        }
        
        [Theory]
        [InlineData(null, null)]                            
        [InlineData("client@gmail.com", null)]
        [InlineData(null, "client123")]
        [InlineData("", "")]
        [InlineData("client@gmail.com", "")]
        [InlineData("", "client123")]
        [InlineData("    ", " ")]
        [InlineData("client@gmail.com", "  ")]
        [InlineData("    ", "client123")]
        [InlineData("notclient@gmail.com", "notclient123")]
        [InlineData("notclient@gmail.com", "client123")]
        [InlineData("client@gmail.com", "notclient123")]
        public void WhenProvidingInCorrectCredentials_ThenReturnNull(string email, string password)
        {
            // Arrange 
            _dbContext.Clients.Add(new Client
            {
                Id = new Guid(),
                Email = "client@gmail.com",
                Password = PasswordManager.Encrypt("client123"),
                FirstName = "testFirstName",
                LastName = "testLastName",
                PhoneNumber = "testPhoneNumber",
                AddressId = new Guid()
            });
            _dbContext.SaveChanges();
            var queryHandler = new ClientLoginQueryHandler(_dbContext);

            // Act
            var res = queryHandler.Handle(new ClientLoginQuery
            { Email = email, Password = password }, default);
            res.Wait();

            // Assert
            Assert.Null(res.Result);
        }

    }
}
