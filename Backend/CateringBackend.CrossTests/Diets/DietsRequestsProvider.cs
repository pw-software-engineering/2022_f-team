using Bogus;
using CateringBackend.CrossTests.Diets.Requests;
using CateringBackend.CrossTests.Meals;
using CateringBackend.CrossTests.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CateringBackend.CrossTests.Diets
{
    public static class DietsRequestsProvider
    {
        public static PostDietRequest PreparePostDietRequest(IEnumerable<Meal> meals, bool isValid = true)
        {
            var diet = FakerHelper.GetFaker<PostDietRequest>()
                .RuleFor(x => x.Name, f => f.Lorem.Word())
                .RuleFor(x => x.Price, f => f.Finance.Amount(1, 1000))
                .Generate();

            if (isValid)
                diet.MealIds = meals.Select(x => x.MealId).ToArray();

            return diet;
        }
    }
}
