using CateringBackend.Domain.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CateringBackend.Users.Deliverer.Commands
{
    public class DeliverOrderCommand : IRequest<bool>
    {
        public Guid OrderId { get; set; }
    }

    public class DeliverOrderCommandHandler : IRequestHandler<DeliverOrderCommand, bool>
    {
        private readonly CateringDbContext _dbContext;

        public DeliverOrderCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(DeliverOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _dbContext.Orders
                .FirstOrDefaultAsync(x => x.Id == request.OrderId && x.Status == Domain.Entities.Enums.OrderStatus.Prepared, cancellationToken);

            if (order == default)
                return false;

            order.Status = Domain.Entities.Enums.OrderStatus.Delivered;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
