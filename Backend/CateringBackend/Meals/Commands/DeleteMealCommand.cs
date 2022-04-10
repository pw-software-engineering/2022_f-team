using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Meals.Queries
{
    public record DeleteMealCommand(Guid MealId) : IRequest<Meal>;

    public class DeleteMealCommandHandler : IRequestHandler<DeleteMealCommand, Meal>
    {
        private readonly CateringDbContext _dbContext;

        public DeleteMealCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Meal> Handle(DeleteMealCommand request, CancellationToken cancellationToken)
        {
            var meal = await _dbContext.Meals.FirstOrDefaultAsync(meal => meal.Id == request.MealId);
            if (meal == default)
                return null;

            if (await MealWithGivenIdIsContaiendByDiet(request.MealId))
                return meal;

            meal.MakeUnavailable();
            await _dbContext.SaveChangesAsync(cancellationToken);
            return meal;
        }

        private async Task<bool> MealWithGivenIdIsContaiendByDiet(Guid mealId) =>
        await _dbContext.Diets.AnyAsync(diet => diet.Meals.Any(meal => meal.Id == mealId));
    }
}
