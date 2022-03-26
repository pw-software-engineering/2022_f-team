using CateringBackend.Clients.Commands;
using FluentValidation.TestHelper;
using Xunit;

namespace CateringBackendUnitTests.Validators
{
    public class RegisterClientCommandValidatorTests
    {
        private readonly RegisterClientCommandValidator _commandValidator;

        public RegisterClientCommandValidatorTests()
        {
            _commandValidator = new RegisterClientCommandValidator();
        }

        [Fact]
        public void RegisterClientCommandValidator_ShouldHaveSetRegisterClientAddressValidatorOnAddress()
        {
            _commandValidator.ShouldHaveChildValidator(x => x.Address, typeof(CateringBackend.Clients.Commands.RegisterClientAddressValidator));
        }

        [Fact]
        public void GetValidRegisterClientCommand_ReturnsValidRegisterClientCommand()
        {
            // Arrange
            var validRegisterCommand = RegisterClientValidatorsTestsData.GetValidRegisterClientCommand();

            // Act 
            var validateResult = _commandValidator.TestValidate(validRegisterCommand);

            // Assert
            validateResult.ShouldNotHaveValidationErrorFor(x => x.Email);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.Name);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.LastName);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.Password);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.PhoneNumber);
            validateResult.ShouldNotHaveValidationErrorFor(x => x.Address);
        }

        [Theory]
        [MemberData(nameof(RegisterClientValidatorsTestsData.EmptyStringsTestData),
            MemberType = typeof(RegisterClientValidatorsTestsData))]
        public void RegisterClientCommand_Name_LastName_Email_ShouldNotBeEmpty(string emptyString)
        {
            // Arrange
            var validRegisterCommand = RegisterClientValidatorsTestsData.GetValidRegisterClientCommand();
            validRegisterCommand.Name = emptyString;
            validRegisterCommand.LastName = emptyString;
            validRegisterCommand.Email = emptyString;

            // Act
            var validateResult = _commandValidator.TestValidate(validRegisterCommand);

            // Assert
            validateResult.ShouldHaveValidationErrorFor(x => x.Name);
            validateResult.ShouldHaveValidationErrorFor(x => x.LastName);
            validateResult.ShouldHaveValidationErrorFor(x => x.Email);
        }

        [Fact]
        public void RegisterClientCommand_Address_ShouldBeNotNull()
        {
            // Arrange
            var validRegisterCommand = RegisterClientValidatorsTestsData.GetValidRegisterClientCommand();
            validRegisterCommand.Address = null;

            // Act
            var validateResult = _commandValidator.TestValidate(validRegisterCommand);

            // Assert
            validateResult.ShouldHaveValidationErrorFor(x => x.Address);
        }

        [Theory]
        [MemberData(nameof(RegisterClientValidatorsTestsData.EmptyStringsTestData),
            MemberType = typeof(RegisterClientValidatorsTestsData))]
        [InlineData("invalidEmail")]
        [InlineData("anotherInvalidEmail")]
        [InlineData("emailWithAtOnly@")]
        [InlineData("DoubleAtEmail@gmail@gmail.com")]
        [InlineData("DoubleDotEmail.gmail.com")]
        public void RegisterClientCommand_Email_CanNotBeInvalidEmailAddress(string email)
        {
            // Arrange
            var validRegisterCommand = RegisterClientValidatorsTestsData.GetValidRegisterClientCommand();
            validRegisterCommand.Email = email;

            // Act
            var validateResult = _commandValidator.TestValidate(validRegisterCommand);

            // Assert
            validateResult.ShouldHaveValidationErrorFor(x => x.Email);
        }

        [Theory]
        [InlineData("ValidEmail@gmail.com")]
        [InlineData("AnotherValidEmail@m.c")]
        [InlineData("AnotherValidEmail@m.")]
        public void RegisterClientCommand_Email_ShouldBeValidEmailAddress(string email)
        {
            // Arrange
            var validRegisterCommand = RegisterClientValidatorsTestsData.GetValidRegisterClientCommand();
            validRegisterCommand.Email = email;

            // Act
            var validateResult = _commandValidator.TestValidate(validRegisterCommand);

            // Assert
            validateResult.ShouldNotHaveValidationErrorFor(x => x.Email);
        }
    }
}
