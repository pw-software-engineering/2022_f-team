using CateringBackend.Domain.Data;
using CateringBackend.Domain.Utilities;
using CateringBackend.Utilities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;

namespace CateringBackend.Clients.Queries
{
    public class LoginClientQuery : IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginClientQueryHandler : IRequestHandler<LoginClientQuery, string>
    {
        private readonly CateringDbContext _dbContext;

        public LoginClientQueryHandler(CateringDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<string> Handle(LoginClientQuery request, CancellationToken cancellationToken)
        {
            var client = await _dbContext.Clients.FirstOrDefaultAsync(
                x => x.Email == request.Email && x.Password == PasswordManager.Encrypt(request.Password), 
                cancellationToken);

            if (client == default)
                return null;

            return JwtTokenUtilities.GetAuthenticationToken(client.Id, client.Email, UserRole.client);
        }
    }
}