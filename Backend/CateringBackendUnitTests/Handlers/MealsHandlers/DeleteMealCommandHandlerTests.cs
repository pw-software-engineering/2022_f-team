using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Meals.Commands;
using EntityFrameworkCore.Testing.Moq;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CateringBackendUnitTests.Handlers.MealsHandlers
{
    public class DeleteMealCommandHandlerTests
    {
        private readonly CateringDbContext _dbContext;

        public DeleteMealCommandHandlerTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
        }

        [Fact]
        public async Task GivenMealIdThatNotExist_WhenHandleDeleteMealCommand_ThenReturnsNull()
        {
            // Arrange
            var deleteMealCommand = new DeleteMealCommand(Guid.NewGuid());
            var deleteMealCommandHandler = new DeleteMealCommandHandler(_dbContext);

            // Act
            var result = await deleteMealCommandHandler.Handle(deleteMealCommand, CancellationToken.None);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GivenMealWithIdThatIsContainedByAvailableDiet_WhenHandleDeleteMealCommand_ThenReturnsAvailableMeal()
        {
            // Arrange 
            var mealId = Guid.NewGuid();

            _dbContext.Meals.Add(new Meal
            {
                Id = mealId,
                IsAvailable = true
            });
            await _dbContext.SaveChangesAsync();
            _dbContext.Diets.Add(new Diet
            {
                IsAvailable = true,
                Meals = new HashSet<Meal>(_dbContext.Meals)
            });
            await _dbContext.SaveChangesAsync();

            var deleteMealCommandHandler = new DeleteMealCommandHandler(_dbContext);
            var deleteMealCommand = new DeleteMealCommand(mealId);

            // Act
            var result = await deleteMealCommandHandler.Handle(deleteMealCommand, CancellationToken.None);

            // Assert
            Assert.True(result.IsAvailable);
        }

        [Theory]
        [MemberData(nameof(DeleteMealCommandHandlerTestsData.GetDeleteMealCommandAndMeal),
            MemberType = typeof(DeleteMealCommandHandlerTestsData))]
        public async Task GivenDeleteMealCommand_WhenHandle_ThenChangesMealAvailabilityInDatabase(
            DeleteMealCommand deleteMealCommand, Meal mealToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            var deleteMealCommandHandler = new DeleteMealCommandHandler(_dbContext);

            // Act
            await deleteMealCommandHandler.Handle(deleteMealCommand, CancellationToken.None);

            // Assert
            var mealFromDatabase = _dbContext.Meals.First();
            Assert.False(mealFromDatabase.IsAvailable);
        }

        [Theory]
        [MemberData(nameof(DeleteMealCommandHandlerTestsData.GetDeleteMealCommandAndMeal),
            MemberType = typeof(DeleteMealCommandHandlerTestsData))]
        public async Task GivenDeleteMealCommand_WhenHandle_ThenReturnsUnavailableMeal(
            DeleteMealCommand deleteMealCommand, Meal mealToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            var deleteMealCommandHandler = new DeleteMealCommandHandler(_dbContext);

            // Act
            var result = await deleteMealCommandHandler.Handle(deleteMealCommand, CancellationToken.None);

            // Assert
            Assert.False(result.IsAvailable);
        }
    }
}