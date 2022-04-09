using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.Users.Producer.Queries;

namespace CateringBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProducerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProducerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginProducer([FromBody] LoginProducerQuery loginQuery)
        {
            var result = await _mediator.Send(loginQuery);
            return string.IsNullOrWhiteSpace(result) ? BadRequest("Niepowodzenie logowania") : Ok(result);
        }
    }
}
