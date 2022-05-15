using System;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.Diets.Queries;
using CateringBackend.Diets.Commands;

namespace CateringBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DietsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DietsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Authorize(Roles = "client,producer")]
        public async Task<IActionResult> GetDiets([FromQuery] GetDietsQuery getDietsQuery)
        {
            var result = await _mediator.Send(getDietsQuery);
            return Ok(result);
        }

        [HttpGet("{dietId}")]
        [Authorize(Roles = "client,producer")]
        public async Task<IActionResult> GetDietDetails([FromRoute] Guid dietId)
        {
            var result = await _mediator.Send(new GetDietDetailsQuery(dietId));
            return result == default ? NotFound("") : Ok(result);
        }

        [HttpDelete("{dietId}")]
        [Authorize(Roles = "producer")]
        public async Task<IActionResult> DeleteDiet([FromRoute] Guid dietId)
        {
            var (dietExists, dietDeleted) = await _mediator.Send(new DeleteDietCommand(dietId));

            if (!dietExists)
                return NotFound("Podana dieta nie istnieje");
            if (!dietDeleted)
                return BadRequest("Niepowodzenie usunięcia diety");

            return Ok("Powodzenie usunięcia diety");
        }
    }
}