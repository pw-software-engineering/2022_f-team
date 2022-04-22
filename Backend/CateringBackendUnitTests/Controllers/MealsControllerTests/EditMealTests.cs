using System;
using System.Net;
using System.Threading;
using CateringBackend.Controllers;
using CateringBackend.Domain.Entities;
using CateringBackend.Meals.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Moq;
using Xunit;

namespace CateringBackendUnitTests.Controllers.MealsControllerTests
{
    public class EditMealTests
    {
        private readonly MealsController _mealsController;
        private readonly Mock<IMediator> _mockedMediator;
        private readonly EditMealCommand _editMealCommand;

        public EditMealTests()
        {
            _mockedMediator = new Mock<IMediator>();
            _mealsController = new MealsController(_mockedMediator.Object);
            _editMealCommand = new EditMealCommand
            {
                MealId = Guid.NewGuid()
            };
        }

        [Fact]
        public async void GivenEditMealCommand_WhenEditMeal_ThenItIsSentToMediatorWithProperMealId()
        {
            // Arrange
            _mockedMediator
                .Setup(x => x.Send(It.IsAny<EditMealCommand>(), It.IsAny<CancellationToken>()))
                .Verifiable("EditMealCommand was not sent");

            // Act
            await _mealsController.EditMeal(_editMealCommand.MealId, _editMealCommand);

            // Assert
            _mockedMediator.Verify(x => x.Send(It.IsAny<EditMealCommand>(), It.IsAny<CancellationToken>()), Times.Once);
            _mockedMediator.Verify(x => x.Send(It.Is<EditMealCommand>(x => x.MealId == _editMealCommand.MealId), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Theory]
        [MemberData(nameof(EditMealTestsData.GetPossibleMediatorReturnsWithExpectedResultCode),
            MemberType = typeof(EditMealTestsData))]
        public async void GivenValueReturnedByMediator_WhenEditMeal_ThenReturnProperStatusCode(Meal mediatorReturnValue, HttpStatusCode expectedStatusCode)
        {
            // Arrange
            _mockedMediator
                .Setup(x => x.Send(It.IsAny<EditMealCommand>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(mediatorReturnValue);

            // Act
            var result = await _mealsController.EditMeal(_editMealCommand.MealId, _editMealCommand);
            var statusCodeActionResult = result as IStatusCodeActionResult;

            // Assert
            Assert.Equal((int)expectedStatusCode, statusCodeActionResult.StatusCode);
        }
    }
}