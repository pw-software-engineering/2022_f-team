using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Users.Client.Commands;
using CateringBackend.Users.Client.Queries;
using System;

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
        [AllowAnonymous]
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

        [HttpPut("account")]
        [Authorize(Roles = "client")]
        public async Task<IActionResult> EditClient([FromBody] EditClientCommand editClientCommand)
        {
            var userId = _userIdFromTokenProvider.GetUserIdFromContextOrThrow(HttpContext);
            var editedSuccessfully = await _mediator.Send(new EditClientWithIdCommand(editClientCommand, userId));
            return editedSuccessfully ? Ok() : BadRequest("Edycja danych nie powiodła się");
        }

        [HttpPost("orders/{orderId}/pay")]
        [Authorize(Roles = "client")]
        public async Task<IActionResult> PayForOrder([FromRoute] Guid orderId)
        {
            var clientId = _userIdFromTokenProvider.GetUserIdFromContextOrThrow(HttpContext);
            var (orderExists, paidForOrder) = await _mediator.Send(new PayForOrderCommand() { ClientId = clientId, OrderId = orderId });

            if (!orderExists)
                return NotFound("Podane zamówienie nie istnieje");
            
            if (!paidForOrder)
                return BadRequest("Opłacenie zamówienia nie powiodło się");

            return CreatedAtAction(nameof(PayForOrder), "Opłacono zamówienie");
        }

        [HttpPost("orders")]
        [Authorize(Roles = "client")]
        public async Task<IActionResult> AddOrder([FromBody] AddOrderCommand addOrderCommand)
        {
            var userId = _userIdFromTokenProvider.GetUserIdFromContextOrThrow(HttpContext);
            var orderId = await _mediator.Send(new AddOrderCommandWithClientId(addOrderCommand, userId));
            return string.IsNullOrEmpty(orderId) ?
                BadRequest("Zapisanie nie powiodło się") :
                CreatedAtAction(nameof(AddOrder), orderId);
        }
    }
}
