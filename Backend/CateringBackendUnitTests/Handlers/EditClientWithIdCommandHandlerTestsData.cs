using System.Collections.Generic;
using CateringBackend.Clients.Commands;
using CateringBackend.Domain.Entities;

namespace CateringBackendUnitTests.Handlers
{
    public static class EditClientWithIdCommandHandlerTestsData
    {
        public static IEnumerable<object[]> GetEditClientCommandAndClient()
        {
            var validClientInDatabase = new Client
            {
                Address = new Address
                {
                    ApartmentNumber = "123",
                    Street = "ClientStreet",
                    City = "ClientCity",
                    PostCode = "ClientPostCode",
                    BuildingNumber = "ClientBuildingNumber"
                },
                Email = "ClientEmail@gmail.com",
                FirstName = "ClientFirstName",
                LastName = "ClientLastName",
                Password = "asdfasdf",
                PhoneNumber = "123456789",
            };

            yield return new object[]
            {
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        City = "EditedCity",
                        ApartmentNumber = "EditedApartmentNumber",
                        Street = "EditedStreet",
                        BuildingNumber = "EditedBuildingNumber",
                        PostCode = "EditedPostCode",
                    },
                    LastName = "EditedLastName",
                    Name = "EditedName",
                    Password = "EditedPassword",
                    PhoneNumber = "+48987654321",
                }
            };
        }
    }
}
