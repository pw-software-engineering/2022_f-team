using CateringBackend.Domain.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CateringBackend.Users.Deliverer.Queries
{
    public record GetDelivererOrdersQuery() : IRequest<IEnumerable<OrderDeliveryDetailsDTO>>;
    public class GetDelivererOrdersQueryHandler : IRequestHandler<GetDelivererOrdersQuery, IEnumerable<OrderDeliveryDetailsDTO>>
    {
        private readonly CateringDbContext _dbContext;

        public GetDelivererOrdersQueryHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<OrderDeliveryDetailsDTO>> Handle(GetDelivererOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _dbContext.Orders
                .Where(x => x.Status == Domain.Entities.Enums.OrderStatus.Prepared)
                .Include(x => x.Client)
                .ThenInclude(x => x.Address)
                .Select(x => new OrderDeliveryDetailsDTO(x))
                .ToListAsync(cancellationToken);

            return orders;
        }
    }
}
