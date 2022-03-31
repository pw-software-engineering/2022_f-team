using System;
using CateringBackend.Clients.Queries;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Utilities;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CateringBackendUnitTests.Handlers
{
    public class LoginClientQueryHandlerTests
    {
        private readonly CateringDbContext _dbContext;

        public LoginClientQueryHandlerTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
        }

        [Theory]
        [InlineData("client@gmail.com", "client123")]
        public void GivenCorrectCredentials_WhenHandleLoginClientQuery_ThenReturnsNotNull(string email, string password)
        {
            // Arrange
            _dbContext.Clients.Add(new Client
            {
                Email = email,
                Password = PasswordManager.Encrypt(password),
            });
            _dbContext.SaveChanges();
            var queryHandler = new LoginClientQueryHandler(_dbContext);

            // Act
            var res = queryHandler.Handle(new LoginClientQuery
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
        public void GivenIncorrectCredentials_WhenHandleLoginClientQuery_ThenReturnsNull(string email, string password)
        {
            // Arrange 
            _dbContext.Clients.Add(new Client
            {
                Email = "client@gmail.com",
                Password = PasswordManager.Encrypt("client123"),
            });
            _dbContext.SaveChanges();
            var queryHandler = new LoginClientQueryHandler(_dbContext);

            // Act
            var res = queryHandler.Handle(new LoginClientQuery
            { Email = email, Password = password }, default);
            res.Wait();

            // Assert
            Assert.Null(res.Result);
        }

    }
}
