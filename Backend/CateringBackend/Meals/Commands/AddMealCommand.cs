using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Meals.Commands
{
    public class AddMealCommand : IRequest<bool>
    {
        public string Name { get; set; }
        public string[] IngredientList { get; set; }
        public string[] AllergenList { get; set; }
        public int Calories { get; set; }
        public bool Vegan { get; set; }
    }

    public class AddMealCommandHandler : IRequestHandler<AddMealCommand, bool>
    {
        private readonly CateringDbContext _dbContext;

        public AddMealCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(AddMealCommand request, CancellationToken cancellationToken)
        {
            if(await MealWithGivenNameIsAvailable(request.Name))
                return false;

            var createdMeal = await AddMealToDatabaseAsync(request, cancellationToken);

            return createdMeal != default;
        }

        private async Task<bool> MealWithGivenNameIsAvailable(string name) => 
            await _dbContext.Meals.FirstOrDefaultAsync(meal => meal.Name == name && meal.IsAvailable) != default;

        private async Task<Meal> AddMealToDatabaseAsync(AddMealCommand addMealCommand, CancellationToken cancellationToken)
        {
            var mealToAdd = Meal.Create(
                addMealCommand.Name,
                string.Join(',', addMealCommand.IngredientList),
                string.Join(',', addMealCommand.AllergenList),
                addMealCommand.Calories,
                addMealCommand.Vegan
            );

            var createdMeal = await _dbContext.Meals.AddAsync(mealToAdd, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return createdMeal.Entity;
        }
    }
}
