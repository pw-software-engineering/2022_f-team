using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.Users.Deliverer.Queries;
using System;
using CateringBackend.Users.Deliverer.Commands;

namespace CateringBackend.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class DelivererController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DelivererController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginDeliverer([FromBody] LoginDelivererQuery loginQuery)
        {
            var result = await _mediator.Send(loginQuery);
            return string.IsNullOrWhiteSpace(result) ? BadRequest("Niepowodzenie logowania") : Ok(result);
        }

        [HttpGet("orders")]
        [Authorize(Roles = "deliverer")]
        public async Task<IActionResult> GetOrders()
        {
            var result = await _mediator.Send(new GetDelivererOrdersQuery());
            return result == default ? NotFound("Pobranie danych nie powiodło się") : Ok(result);
        }

        [HttpPost("orders/{orderId}/deliver")]
        [Authorize(Roles = "deliverer")]
        public async Task<IActionResult> DeliverOrder([FromRoute] Guid orderId)
        {
            var orderDelivered = await _mediator.Send(new DeliverOrderCommand() { OrderId = orderId});
            if (!orderDelivered)
                return NotFound("Podane zamówienie nie istnieje");
            return CreatedAtAction(nameof(DeliverOrder), "Dostarczono zamówienie");
        }
    }
}
