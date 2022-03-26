using System.Linq;
using System.Net;
using CateringBackend.Clients.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Clients.Commands;

namespace CateringBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IUserIdFromTokenProvider _userIdFromTokenProvider;

        public ClientController(IMediator mediator, IUserIdFromTokenProvider userIdFromTokenProvider)
        {
            _mediator = mediator;
            _userIdFromTokenProvider = userIdFromTokenProvider;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterClient([FromBody] RegisterClientCommand registerClientCommand)
        {
            var result = await _mediator.Send(registerClientCommand);
            return string.IsNullOrWhiteSpace(result)
                ? BadRequest("Konto nie zostało utworzone")
                : CreatedAtAction(nameof(RegisterClient), result);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginClient([FromBody] LoginClientQuery loginQuery)
        {
            var result = await _mediator.Send(loginQuery);
            return string.IsNullOrWhiteSpace(result) ? BadRequest("Niepowodzenie logowania") : Ok(result);
        }

        [HttpGet("account")]
        [Authorize(Roles = "client")]
        public async Task<IActionResult> GetClientDetails()
        {
            var userId = _userIdFromTokenProvider.GetUserIdFromContextOrThrow(HttpContext);
            var result = await _mediator.Send(new GetClientDetailsQuery(userId));
            return result == default ? NotFound("Pobranie danych nie powiodło się") : Ok(result);
        }
    }
}
