using System;
using CateringBackend.Clients.Commands;
using FluentValidation.TestHelper;
using Xunit;

namespace CateringBackendUnitTests.Validators
{
    public class RegisterClientAddressValidatorTests
    {
        private readonly RegisterClientAddressValidator _commandValidator;

        public RegisterClientAddressValidatorTests()
        {
            _commandValidator = new RegisterClientAddressValidator();
        }

        [Fact]
        public void GetValidRegisterClientAddress_ReturnsValidRegisterClientAddress()
        {
            // Arrange
            var validRegisterClientAddress = RegisterClientValidatorsTestsData.GetValidRegisterClientAddress();

            // Act 
            var validateResult = _commandValidator.TestValidate(validRegisterClientAddress);

            // Assert
            validateResult.ShouldNotHaveValidationErrorFor(x => x.City);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.Street);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.ApartmentNumber);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.BuildingNumber);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.PostCode);
        }

        [Theory]
        [MemberData(nameof(RegisterClientValidatorsTestsData.EmptyStringsTestData),
            MemberType = typeof(RegisterClientValidatorsTestsData))]
        public void RegisterClientAddress_Street_BuildingNumber_PostCode_City_ShouldNotBeEmpty(string emptyString)
        {
            // Arrange
            var validRegisterClientAddress = RegisterClientValidatorsTestsData.GetValidRegisterClientAddress();
            validRegisterClientAddress.Street = emptyString;
            validRegisterClientAddress.BuildingNumber = emptyString;
            validRegisterClientAddress.PostCode = emptyString;
            validRegisterClientAddress.City = emptyString;

            // Act
            var validateResult = _commandValidator.TestValidate(validRegisterClientAddress);

            // Assert
            validateResult.ShouldHaveValidationErrorFor(x => x.Street);
            validateResult.ShouldHaveValidationErrorFor(x => x.BuildingNumber);
            validateResult.ShouldHaveValidationErrorFor(x => x.PostCode);
            validateResult.ShouldHaveValidationErrorFor(x => x.City);
        }
    }
}
