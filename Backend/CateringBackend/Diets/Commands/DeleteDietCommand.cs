using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Diets.Commands
{
    public record DeleteDietCommand(Guid DietId) : IRequest<(bool, bool)>;

    public class DeleteDietCommandHandler : IRequestHandler<DeleteDietCommand, (bool dietExists, bool dietDeleted)>
    {
        private readonly CateringDbContext _dbContext;

        public DeleteDietCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<(bool dietExists, bool dietDeleted)> Handle(DeleteDietCommand request, CancellationToken cancellationToken)
        {
            var diet = await _dbContext.Diets
                .Where(d => d.IsAvailable)
                .FirstOrDefaultAsync(d => d.Id == request.DietId, cancellationToken);

            if (diet == default)
                return (dietExists: false, dietDeleted: false);

            diet.MakeUnavailable();
            if ((await _dbContext.SaveChangesAsync(cancellationToken)) == 0)
                return (dietExists: true, dietDeleted: false);

            return (dietExists: true, dietDeleted: true);
        }
    }
}
