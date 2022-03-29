using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Utilities;
using CateringBackend.Exceptions;
using CateringBackend.Utilities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Clients.Commands
{
    public class EditClientCommand : IRequest<bool>
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public RegisterClientAddress Address { get; set; }
    }

    public class EditClientCommandCommandValidator : AbstractValidator<EditClientCommand>
    {
        public EditClientCommandCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Password).MinimumLength(ValidationConstants.MinimumPasswordLength);
            RuleFor(x => x.PhoneNumber).Matches(ValidationConstants.PhoneNumberRegex);
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.Address).SetValidator(new RegisterClientAddressValidator());
        }
    }

    public class EditClientWithIdCommand : EditClientCommand
    {
        public Guid ClientId { get; set; }

        public EditClientWithIdCommand(EditClientCommand editClientCommand, Guid clientId)
        {
            ClientId = clientId;
            Name = editClientCommand.Name;
            LastName = editClientCommand.LastName;
            Password = editClientCommand.Password;
            PhoneNumber = editClientCommand.PhoneNumber;
            Address = editClientCommand.Address;
        }
    }

    public class EditClientWithIdCommandHandler : IRequestHandler<EditClientWithIdCommand, bool>
    {
        private readonly CateringDbContext _dbContext;

        public EditClientWithIdCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(EditClientWithIdCommand request, CancellationToken cancellationToken)
        {
            var client = _dbContext.Clients.FirstOrDefault(c => c.Id == request.ClientId);
            if (client == default)
            {
                return false;
            }

            await EditClient(request, client);

            await _dbContext.SaveChangesAsync(cancellationToken);

            return true;
        }

        private async Task EditClient(EditClientWithIdCommand editCommand, Client client)
        {
            await EditClientAddressIfProvided(editCommand, client);
            if (!string.IsNullOrWhiteSpace(editCommand.Name)) client.FirstName = editCommand.Name;
            if (!string.IsNullOrWhiteSpace(editCommand.LastName)) client.LastName = editCommand.LastName;
            if (!string.IsNullOrWhiteSpace(editCommand.Password)) client.Password = PasswordManager.Encrypt(editCommand.Password);
            if (!string.IsNullOrWhiteSpace(editCommand.PhoneNumber)) client.PhoneNumber = editCommand.PhoneNumber;
        }

        private async Task EditClientAddressIfProvided(EditClientWithIdCommand editCommand, Client client)
        {
            if (editCommand.Address != default)
            {
                var clientAddress = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.Id == client.AddressId);
                if (clientAddress == default)
                {
                    throw new MissingAddressForClientException(client.Id);
                }

                if(!string.IsNullOrWhiteSpace(editCommand.Address.City)) clientAddress.City = editCommand.Address.City;
                if (!string.IsNullOrWhiteSpace(editCommand.Address.ApartmentNumber)) clientAddress.ApartmentNumber = editCommand.Address.ApartmentNumber;
                if (!string.IsNullOrWhiteSpace(editCommand.Address.BuildingNumber)) clientAddress.BuildingNumber = editCommand.Address.BuildingNumber;
                if (!string.IsNullOrWhiteSpace(editCommand.Address.Street)) clientAddress.Street = editCommand.Address.Street;
                if (!string.IsNullOrWhiteSpace(editCommand.Address.PostCode)) clientAddress.PostCode = editCommand.Address.PostCode;
            }
        }
    }
}