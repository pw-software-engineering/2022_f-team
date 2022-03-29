using System;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Utilities;
using CateringBackend.Utilities;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CateringBackend.Clients.Commands
{
    public class RegisterClientCommand : IRequest<string>
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public RegisterClientAddress Address { get; set; }
    }

    public class RegisterClientCommandValidator : AbstractValidator<RegisterClientCommand>
    {
        public RegisterClientCommandValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Password).MinimumLength(ValidationConstants.MinimumPasswordLength);
            RuleFor(x => x.PhoneNumber).Matches(ValidationConstants.PhoneNumberRegex);
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.Email).EmailAddress();
            RuleFor(x => x.Address).NotEmpty();
            RuleFor(x => x.Address).SetValidator(new RegisterClientAddressValidator());
        }
    }

    public class RegisterClientAddress
    {
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string ApartmentNumber { get; set; }
        public string PostCode { get; set; }
        public string City { get; set; }
    }

    public class RegisterClientAddressValidator : AbstractValidator<RegisterClientAddress>
    {
        public RegisterClientAddressValidator()
        {
            RuleFor(x => x.Street).NotEmpty();
            RuleFor(x => x.BuildingNumber).NotEmpty();
            RuleFor(x => x.PostCode).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
        }
    }

    public class RegisterClientCommandHandler : IRequestHandler<RegisterClientCommand, string>
    {
        private readonly CateringDbContext _dbContext;

        public RegisterClientCommandHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Handle(RegisterClientCommand request, CancellationToken cancellationToken)
        {
            if (await UserWithGivenEmailExistsAsync(request.Email)) return null;

            var createdAddress = await AddAddressToDatabaseAsync(request.Address, cancellationToken);

            var createdClient = await AddClientToDatabaseAsync(request, createdAddress.Id, cancellationToken);

            return JwtTokenUtilities.GetAuthenticationToken(createdClient.Id, createdClient.Email, UserRole.client);
        }

        private async Task<bool> UserWithGivenEmailExistsAsync(string email) => 
            await _dbContext.Clients.FirstOrDefaultAsync(client => client.Email == email) != default;

        private async Task<Address> AddAddressToDatabaseAsync(RegisterClientAddress clientAddress, CancellationToken cancellationToken)
        {
            var clientAddressToAdd = Address.Create(
                street: clientAddress.Street,
                buildingNumber: clientAddress.BuildingNumber,
                apartmentNumber: clientAddress.ApartmentNumber,
                postCode: clientAddress.PostCode,
                city: clientAddress.City);

            var createdAddress = await _dbContext.Addresses.AddAsync(clientAddressToAdd, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return createdAddress.Entity;
        }

        private async Task<Client> AddClientToDatabaseAsync(
            RegisterClientCommand registerClientCommand,
            Guid addressId,
            CancellationToken cancellationToken)
        {
            var clientToAdd = Client.Create(
                email: registerClientCommand.Email,
                encryptedPassword: PasswordManager.Encrypt(registerClientCommand.Password),
                firstName: registerClientCommand.Name,
                lastName: registerClientCommand.LastName,
                phoneNumber: registerClientCommand.PhoneNumber,
                addressId);

            var createdClient = await _dbContext.Clients.AddAsync(clientToAdd, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return createdClient.Entity;
        }
    }
}