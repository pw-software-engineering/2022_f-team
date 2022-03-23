using CateringBackend.Domain.Data;
using CateringBackend.Domain.Utilities;
using CateringBackend.Utilities;
using CateringBackend.Utilities.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Threading;
using System.Threading.Tasks;

namespace CateringBackend.Clients.Queries
{
    public class ClientLoginQuery: IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class ClientLoginQueryHandler : IRequestHandler<ClientLoginQuery, string>
    {
        private readonly CateringDbContext _dbContext;

        public ClientLoginQueryHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Handle(ClientLoginQuery request, CancellationToken cancellationToken)
        {
            var client = await _dbContext.Clients.FirstOrDefaultAsync(
                x => x.Email == request.Email && x.Password == PasswordManager.Encrypt(request.Password), 
                cancellationToken);

            if (client == default)
                return null;

            var token = AuthUtils.GetAuthenticationToken(client.Id, client.Email, Role.client);
            return token;
        }
    }
}