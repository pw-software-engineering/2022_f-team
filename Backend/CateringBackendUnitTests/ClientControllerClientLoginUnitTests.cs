using CateringBackend.Controllers;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Utilities;
using CateringBackend.Clients.Queries;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Xunit;

namespace CateringBackEndUnitTests
{
    public class ClientControllerClientLoginUnitTests
    {
        private readonly CateringDbContext _dbContext;
        private readonly ClientLoginQueryHandler _loginQueryHandler;

        public ClientControllerClientLoginUnitTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
            var seeder = new ConfigDataSeeder(_dbContext);
            seeder.SeedConfigData();
            _loginQueryHandler = new ClientLoginQueryHandler(_dbContext);
        }

        [Theory]
        [InlineData("client@gmail.com", "client123")]
        public void WhenProvidingCorrectCredentials_ThenReturnJwtToken(string email, string password)
        {
            var res = _loginQueryHandler.Handle(new ClientLoginQuery() 
            { Email = email, Password = password }, default);
            res.Wait();

            Assert.NotNull(res.Result);
        }
        
        [Theory]
        [InlineData(null, null)]                            
        [InlineData("client@gmail.com", null)]
        [InlineData(null, "client123")]
        [InlineData("notclient@gmail.com", "notclinet123")]
        [InlineData("notclient@gmail.com", "clinet123")]
        [InlineData("client@gmail.com", "notclinet123")]
        public void WhenProvidingInCorrectCredentials_ThenReturnNull(string email, string password)
        {
            var res = _loginQueryHandler.Handle(new ClientLoginQuery()
            { Email = email, Password = password }, default);
            res.Wait();

            Assert.Null(res.Result);
        }

    }
}
