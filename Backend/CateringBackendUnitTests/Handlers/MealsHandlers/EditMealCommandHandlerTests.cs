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
    public class EditMealCommandHandlerTests
    {
        private readonly CateringDbContext _dbContext;
        private readonly EditMealCommandHandler _editMealCommandHandler;
        public EditMealCommandHandlerTests()
        {
            var options = new DbContextOptionsBuilder<CateringDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()).Options;
            _dbContext = Create.MockedDbContextFor<CateringDbContext>(options);
            _editMealCommandHandler = new EditMealCommandHandler(_dbContext);
        }

        [Fact]
        public async Task GivenMealIdThatNotExist_WhenHandleEditMealCommand_ThenReturnsNull()
        {
            // Arrange
            var editMealCommand = new EditMealCommand
            {
                MealId = Guid.NewGuid()
            };

            // Act
            var result = await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GivenMealIdThatIsUnavailable_WhenHandleEditMealCommand_TheReturnsNull()
        {
            // Arrange
            var mealToAddToDatabase = new Meal()
            {
                Id = Guid.NewGuid(),
                IsAvailable = false
            };
            _dbContext.Meals.Add(mealToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            var editMealCommand = new EditMealCommand
            {
                MealId = mealToAddToDatabase.Id
            };

            // Act
            var result = await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GivenMealNameThatAlreadyExistsAndAvailable_WhenHandleEditMealCommand_ThenReturnsAvailableMeal()
        {
            // Arrange
            var mealsToAddToDatabase = new List<Meal>()
            {
                new Meal()
                {
                    Id = Guid.NewGuid(),
                    IsAvailable = true,
                    Name = "TestMeal"
                },
                new Meal()
                {
                    Id = Guid.NewGuid(),
                    IsAvailable = true,
                    Name = "TestMeal2"
                }
            };
            _dbContext.Meals.AddRange(mealsToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            var editMealCommand = new EditMealCommand
            {
                MealId = mealsToAddToDatabase.First().Id,
                Name = mealsToAddToDatabase.Last().Name
            };

            // Act
            var result = await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            Assert.True(result.IsAvailable);
        }

        [Theory]
        [MemberData(nameof(EditMealCommandHandlerTestsData.GetEditMealCommandAndMeal),
            MemberType = typeof(EditMealCommandHandlerTestsData))]
        public async Task GivenEditMealCommand_WhenHandle_ThenChangesMealAvailabilityInDatabase(
            EditMealCommand editMealCommand, Meal mealToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            // Act
            await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            var mealFromDatabase = _dbContext.Meals.First();
            Assert.False(mealFromDatabase.IsAvailable);
        }

        [Theory]
        [MemberData(nameof(EditMealCommandHandlerTestsData.GetEditMealCommandAndMeal),
            MemberType = typeof(EditMealCommandHandlerTestsData))]
        public async Task GivenEditMealCommand_WhenHandle_ThenAddsCorrectMealToDatabase(
            EditMealCommand editMealCommand, Meal mealToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            // Act
            await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            AssertMealEditedInDatabase(_dbContext, editMealCommand);
        }

        [Theory]
        [MemberData(nameof(EditMealCommandHandlerTestsData.GetEditMealCommandAndMealWithDiets),
            MemberType = typeof(EditMealCommandHandlerTestsData))]
        public async Task GivenEditMealCommand_WhenHandle_ThenMakesEveryDietContainingGivenMealUnavailable(
            EditMealCommand editMealCommand, Meal mealToAddToDatabase, IEnumerable<Diet> dietsToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            _dbContext.Diets.AddRange(dietsToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            // Act
            await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            foreach (var diet in _dbContext.Diets)
                if (diet.Meals.Any(m => m.Id == editMealCommand.MealId))
                    Assert.False(diet.IsAvailable);
        }
        
        [Theory]
        [MemberData(nameof(EditMealCommandHandlerTestsData.GetEditMealCommandAndMealWithDietThatContainsIt),
            MemberType = typeof(EditMealCommandHandlerTestsData))]
        public async Task GivenEditMealCommand_WhenHandle_ThenCorrectlyCopiesDietsAndReplacesMealInDatabase(
            EditMealCommand editMealCommand, Meal mealToAddToDatabase, Diet dietToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            _dbContext.Diets.Add(dietToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            // Act
            await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            AssertDietCopiedInDatabase(_dbContext, editMealCommand);
        }
        
        [Theory]
        [MemberData(nameof(EditMealCommandHandlerTestsData.GetEditMealCommandAndMeal),
            MemberType = typeof(EditMealCommandHandlerTestsData))]
        public async Task GivenEditMealCommand_WhenHandle_ThenReturnsUnavailableMeal(
            EditMealCommand editMealCommand, Meal mealToAddToDatabase)
        {
            // Arrange
            _dbContext.Meals.Add(mealToAddToDatabase);
            await _dbContext.SaveChangesAsync();

            // Act
            var result = await _editMealCommandHandler.Handle(editMealCommand, CancellationToken.None);

            // Assert
            Assert.False(result.IsAvailable);
        }

        private static void AssertMealEditedInDatabase(CateringDbContext dbContext,
            EditMealCommand editMealCommand)
        {
            Assert.Equal(2, dbContext.Meals.Count());
            var addedMeal = dbContext.Meals.Last();
            Assert.Equal(editMealCommand.Name, addedMeal.Name);
            Assert.Equal(editMealCommand.Calories, addedMeal.Calories);
            Assert.Equal(editMealCommand.Vegan, addedMeal.IsVegan);

            if (editMealCommand.IngredientList != null)
                Assert.Equal(string.Join(',', editMealCommand.IngredientList), addedMeal.Ingredients);
            else
                Assert.Equal(string.Empty, addedMeal.Ingredients);

            if (editMealCommand.AllergenList != null)
                Assert.Equal(string.Join(',', editMealCommand.AllergenList), addedMeal.Allergens);
            else
                Assert.Equal(string.Empty, addedMeal.Allergens);
        }

        private static void AssertDietCopiedInDatabase(CateringDbContext dbContext,
            EditMealCommand editMealCommand)
        {
            Assert.Equal(2, dbContext.Diets.Count());
            var oldDiet = dbContext.Diets.First();
            var newDiet = dbContext.Diets.Last();
            var editedMeal = dbContext.Meals.Last();

            Assert.Equal(oldDiet.Title, newDiet.Title);
            Assert.Equal(oldDiet.Description, newDiet.Description);
            Assert.Equal(oldDiet.Price, newDiet.Price);
            Assert.True(newDiet.IsAvailable);
            Assert.Contains(editedMeal, newDiet.Meals);

            foreach (var meal in oldDiet.Meals)
                if (meal.Id == editMealCommand.MealId)
                    Assert.DoesNotContain(meal, newDiet.Meals);
                else
                    Assert.Contains(meal, newDiet.Meals);
        }
    }
}