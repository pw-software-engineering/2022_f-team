using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Entities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Users.Client.Commands
{
    public class AddOrderCommand
    {
        public string[] DietIDs { get; set; }
        public DeliveryDetailsDTO DeliveryDetails { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class AddOrderCommandWithClientId : IRequest<string>
    {
        public Guid ClientId { get; set; }
        public string[] DietIDs { get; set; }
        public DeliveryDetailsDTO DeliveryDetails { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public AddOrderCommandWithClientId(AddOrderCommand addOrderCommand, Guid clientId)
        {
            ClientId = clientId;
            DietIDs = addOrderCommand.DietIDs[..];
            DeliveryDetails = addOrderCommand.DeliveryDetails;
            StartDate = addOrderCommand.StartDate;
            EndDate = addOrderCommand.EndDate;
        }
    }

    public class AddOrderCommandHandler : IRequestHandler<AddOrderCommandWithClientId, string>
    {
        private readonly CateringDbContext _dbContext;

        public AddOrderCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Handle(AddOrderCommandWithClientId request, CancellationToken cancellationToken)
        {
            if (request.EndDate <= request.StartDate ||
                request.StartDate <= DateTime.Now)
                return null;

            if (CheckDietIDsNotExists(request.DietIDs))
                return null;

            var addressInDB = await SearchForAddressInDatabase(request.DeliveryDetails.Address);
            if(addressInDB == default)
            {
                addressInDB = AddressDTO.CreateAddressFromDTO(request.DeliveryDetails.Address);
                _dbContext.Addresses.Add(addressInDB);
            }

            var orderToAdd = new Order
            {
                Id = Guid.NewGuid(),
                Status = OrderStatus.WaitingForPayment,
                ClientId = request.ClientId,
                CommentForDeliverer = request.DeliveryDetails.CommentForDeliverer,
                DeliveryAddressId = addressInDB.Id,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Price = AccumulateDietsPrice(request.DietIDs),
                Diets = new HashSet<Diet>(
                    _dbContext.Diets.Where(d => request.DietIDs.Contains(d.Id.ToString())).ToList()
                    )
            };

            _dbContext.Orders.Add(orderToAdd);

            await _dbContext.SaveChangesAsync();
            return orderToAdd.Id.ToString();
        }

        private bool CheckDietIDsNotExists(string[] DietIDs) =>
            DietIDs.Any(id => !_dbContext.Diets.Where(d => d.IsAvailable).Any(d => d.Id.ToString() == id));
        private async Task<Address> SearchForAddressInDatabase(AddressDTO addressDTO) => await
            _dbContext.Addresses.FirstOrDefaultAsync(a => 
                a.Street == addressDTO.Street &&
                a.BuildingNumber == addressDTO.BuildingNumber &&
                a.ApartmentNumber == addressDTO.ApartmentNumber &&
                a.PostCode == addressDTO.PostCode && 
                a.City == addressDTO.City
            );

        private decimal AccumulateDietsPrice(string[] DietIDs)
        {
            decimal sum = 0;
            foreach(var diet in _dbContext.Diets.Where(d => DietIDs.Contains(d.Id.ToString())).ToList())
            {
                sum += diet.Price;
            }
            return sum;
        }
    }
}