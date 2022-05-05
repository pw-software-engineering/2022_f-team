using System;
using CateringBackend.Domain.Entities;
using CateringBackend.Utilities.Extensions;

namespace CateringBackend.Meals
{
    public record MealDetailsDTO
    {
        public Guid MealId { get; set; }
        public string Name { get; set; }
        public string[] IngredientList { get; set; }
        public string[] AllergenList { get; set; }
        public int Calories { get; set; }
        public bool Vegan { get; set; }

        public MealDetailsDTO(Meal meal)
        {
            MealId = meal.Id;
            Name = meal.Name;
            IngredientList = meal.Ingredients?.SplitByCommaToArray();
            AllergenList = meal.Allergens?.SplitByCommaToArray();
            Calories = meal.Calories;
            Vegan = meal.IsVegan;
        }
    }
}
