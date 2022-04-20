using CateringBackend.CrossTests.Utilities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CateringBackend.CrossTests.Meals
{
    public static class MealsRequestsProvider
    {
        public static IEnumerable<Meal> PrepareMeals(int count, bool isValid = true)
        {
            var meals = FakerHelper.GetFaker<Meal>()
                .RuleFor(x => x.MealId, f => f.Random.Guid().ToString())
                .RuleFor(x => x.Name, f => f.Lorem.Word())
                .RuleFor(x => x.Vegan, f => f.Random.Bool())
                .RuleFor(x => x.AllergenList, f => f.Lorem.Words(5))
                .RuleFor(x => x.IngredientList, f => f.Lorem.Words(5))
                .RuleFor(x => x.Calories, f => f.Random.Number(50, 300))
                .Generate(count);

            if (!isValid)
                meals.ForEach(x => x.MealId = null);

            return meals;
        }
    }
}
