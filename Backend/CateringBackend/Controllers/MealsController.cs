using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using CateringBackend.Meals.Queries;

namespace CateringBackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MealsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MealsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{mealId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMealDetails([FromRoute] Guid mealId)
        {
            var result = await _mediator.Send(new GetMealDetailsQuery(mealId));
            return result == default ? NotFound("Podany posiłek nie istnieje") : Ok(result);
        }
    }
}