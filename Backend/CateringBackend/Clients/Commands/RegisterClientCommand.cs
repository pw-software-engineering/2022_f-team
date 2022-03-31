using System.Threading;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using CateringBackend.Domain.Utilities;
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

    //public class RegisterClientCommandValidator : AbstractValidator<RegisterClientCommand>
    //{
    //    public RegisterClientCommandValidator()
    //    {
    //        RuleFor(x => x.Name).NotEmpty();
    //        RuleFor(x => x.LastName).NotEmpty();
    //        RuleFor(x => x.Password).MinimumLength(ValidationConstants.MinimumPasswordLength);
    //        RuleFor(x => x.PhoneNumber).Matches(ValidationConstants.PhoneNumberRegex);
    //        RuleFor(x => x.Email).NotEmpty();
    //        RuleFor(x => x.Email).EmailAddress();
    //        RuleFor(x => x.Address).NotEmpty();
    //        RuleFor(x => x.Address).SetValidator(new RegisterClientAddressValidator());
    //    }
    //}

    public class RegisterClientAddress
    {
        public string Street { get; set; }
        public string BuildingNumber { get; set; }
        public string ApartmentNumber { get; set; }
        public string PostCode { get; set; }
        public string City { get; set; }
    }

    //public class RegisterClientAddressValidator : AbstractValidator<RegisterClientAddress>
    //{
    //    public RegisterClientAddressValidator()
    //    {
    //        RuleFor(x => x.Street).NotEmpty();
    //        RuleFor(x => x.BuildingNumber).NotEmpty();
    //        RuleFor(x => x.PostCode).NotEmpty();
    //        RuleFor(x => x.City).NotEmpty();
    //    }
    //}

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

            var createdClient = await AddClientToDatabaseAsync(request, cancellationToken);

            return JwtTokenUtilities.GetAuthenticationToken(createdClient.Id, createdClient.Email, UserRole.client);
        }

        private async Task<bool> UserWithGivenEmailExistsAsync(string email) => 
            await _dbContext.Clients.FirstOrDefaultAsync(client => client.Email == email) != default;

        private async Task<Client> AddClientToDatabaseAsync(
            RegisterClientCommand registerClientCommand,
            CancellationToken cancellationToken)
        {
            var clientToAdd = new Client
            {
                Address = new Address
                {
                    ApartmentNumber = registerClientCommand.Address.ApartmentNumber,
                    BuildingNumber = registerClientCommand.Address.BuildingNumber,
                    City = registerClientCommand.Address.City,
                    PostCode = registerClientCommand.Address.PostCode,
                    Street = registerClientCommand.Address.Street,
                },
                Email = registerClientCommand.Email,
                FirstName = registerClientCommand.Name,
                LastName = registerClientCommand.LastName,
                Password = PasswordManager.Encrypt(registerClientCommand.Password),
                PhoneNumber = registerClientCommand.PhoneNumber,
            };

            var createdClient = await _dbContext.Clients.AddAsync(clientToAdd, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return createdClient.Entity;
        }
    }
}