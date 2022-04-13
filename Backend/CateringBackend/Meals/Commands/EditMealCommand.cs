using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Meals.Commands
{
    public class EditMealCommand : IRequest<Meal>
    {
        public Guid MealId { get; set; }
        public string Name { get; set; }
        public string[] IngredientList { get; set; }
        public string[] AllergenList { get; set; }
        public int Calories { get; set; }
        public bool Vegan { get; set; }
    }

    public class EditMealCommandHandler : IRequestHandler<EditMealCommand, Meal>
    {
        private readonly CateringDbContext _dbContext;

        public EditMealCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Meal> Handle(EditMealCommand request, CancellationToken cancellationToken)
        {
            var mealToEdit = await SearchForMealInDatabase(request.MealId, cancellationToken);

            if (mealToEdit == default)
                return null;

            mealToEdit.MakeUnavailable();

            var newMeal = await AddMealToDatabaseAsync(request, cancellationToken);
            
            var dietsToEdit = SearchDietsContainingMealId(mealToEdit.Id);
            await dietsToEdit.ForEachAsync(d => d.MakeUnavailable(), cancellationToken);

            await AddDietsWithEditedMealToDatabaseAsync(dietsToEdit, mealToEdit, newMeal, cancellationToken);
            
            await _dbContext.SaveChangesAsync(cancellationToken);
            return mealToEdit;
        }

        private async Task<Meal> SearchForMealInDatabase(Guid mealId, CancellationToken cancellationToken) => await
            _dbContext.Meals.Where(meal => meal.IsAvailable).FirstOrDefaultAsync(meal => meal.Id == mealId, cancellationToken);
        
        private async Task<Meal> AddMealToDatabaseAsync(EditMealCommand addMealCommand, CancellationToken cancellationToken)
        {
            var createdMeal = await _dbContext.Meals.AddAsync(
                Meal.Create(
                    addMealCommand.Name,
                    string.Join(',', addMealCommand.IngredientList),
                    string.Join(',', addMealCommand.AllergenList),
                    addMealCommand.Calories,
                    addMealCommand.Vegan), 
                cancellationToken);
            return createdMeal.Entity;
        }

        private async Task AddDietsWithEditedMealToDatabaseAsync(IQueryable<Diet> dietsToEdit, Meal mealToEdit, Meal newMeal, CancellationToken cancellationToken)
        {
            await dietsToEdit
                .Include(d=>d.Meals)
                .ForEachAsync(async d => await _dbContext.Diets.AddAsync(
                    Diet.Create(
                        d.Title,
                        d.Description,
                        d.Price,
                        ReplaceEditedMeal(d.Meals, mealToEdit, newMeal)),
                    cancellationToken), 
                cancellationToken);
        }

        private IEnumerable<Meal> ReplaceEditedMeal(ICollection<Meal> meals, Meal mealToEdit, Meal newMeal) => 
            meals.Select(m => m.Id == mealToEdit.Id ? newMeal : m);

        private IQueryable<Diet> SearchDietsContainingMealId(Guid mealId) =>
            _dbContext.Diets.Where(d => d.IsAvailable && d.Meals.Any(m => m.Id == mealId));
    }
}
