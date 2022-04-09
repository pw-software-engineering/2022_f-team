using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.Users.Deliverer.Queries;

namespace CateringBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DelivererController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DelivererController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginClient([FromBody] LoginDelivererQuery loginQuery)
        {
            var result = await _mediator.Send(loginQuery);
            return string.IsNullOrWhiteSpace(result) ? BadRequest("Niepowodzenie logowania") : Ok(result);
        }
    }
}
