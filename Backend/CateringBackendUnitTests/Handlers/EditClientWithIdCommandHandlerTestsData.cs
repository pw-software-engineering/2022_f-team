using System;
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
                "Edit Address.City only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        City = "EditedCityOnly",
                    }
                }
            };

            yield return new object[]
            {
                "Edit Address.ApartmentNumber only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        ApartmentNumber = "EditedApartmentNumberOnly",
                    }
                }
            };

            yield return new object[]
            {
                "Edit Address.Street only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        Street = "EditedStreetOnly",
                    }
                }
            };

            yield return new object[]
            {
                "Edit Address.BuildingNumber only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        BuildingNumber = "EditedBuildingNumberOnly",
                    }
                }
            };

            yield return new object[]
            {
                "Edit Address.PostCode only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        PostCode = "EditedPostCodeOnly",
                    }
                }
            };

            yield return new object[]
            {
                "Edit Address.BuildingNumber only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Address = new RegisterClientAddress
                    {
                        BuildingNumber = "ClientBuildingNumberOnly"
                    }
                }
            };

            yield return new object[]
            {
                "Edit LastName only",
                validClientInDatabase,
                new EditClientCommand
                {
                    LastName = "EditedLastNameOnly"
                }
            };

            yield return new object[]
            {
                "Edit Name only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Name = "EditedName",
                }
            };

            yield return new object[]
            {
                "Edit Password only",
                validClientInDatabase,
                new EditClientCommand
                {
                    Password = "EditedPassword",
                }
            };

            yield return new object[]
            {
                "Edit PhoneNumber only",
                validClientInDatabase,
                new EditClientCommand
                {
                    PhoneNumber = "+48987654321",
                }
            };

            yield return new object[]
            {
                "Edit all fields at once",
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
