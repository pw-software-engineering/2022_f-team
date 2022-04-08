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

        [HttpGet]
        // TODO: change the AllowAnonymous to the appropriate authorization 
        [AllowAnonymous]
        public async Task<IActionResult> GetMeals([FromQuery] GetMealsQuery getMealsQuery)
        {
            var result = await _mediator.Send(getMealsQuery);
            return Ok(result);
        }

        [HttpGet("{mealId}")]
        // TODO: change the AllowAnonymous to the appropriate authorization 
        [AllowAnonymous]
        public async Task<IActionResult> GetMealDetails([FromRoute] Guid mealId)
        {
            var result = await _mediator.Send(new GetMealDetailsQuery(mealId));
            return result == default ? NotFound("Podany posiłek nie istnieje") : Ok(result);
        }
    }
}