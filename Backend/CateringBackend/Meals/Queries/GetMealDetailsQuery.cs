using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Utilities.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Meals.Queries
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
            IngredientList = meal.Ingredients.SplitByCommaToArray();
            AllergenList = meal.Allergens.SplitByCommaToArray();
            Calories = (int)meal.Calories;
            Vegan = meal.IsVegan;
        }
    }

    public record GetMealDetailsQuery(Guid MealId) : IRequest<MealDetailsDTO>;

    public class GetMealDetailsQueryHandler : IRequestHandler<GetMealDetailsQuery, MealDetailsDTO>
    {
        private readonly CateringDbContext _dbContext;

        public GetMealDetailsQueryHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<MealDetailsDTO> Handle(GetMealDetailsQuery request, CancellationToken cancellationToken)
        {
            var meal = await _dbContext.Meals.FirstOrDefaultAsync(meal => meal.Id == request.MealId, cancellationToken);
            
            if(meal == default)
            {
                return null;
            }

            return new MealDetailsDTO(meal);
        }
    }
}
