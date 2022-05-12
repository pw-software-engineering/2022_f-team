﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CateringBackend.AuthUtilities;
using CateringBackend.Users.Client.Commands;
using CateringBackend.Users.Client.Queries;

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

        [HttpPost("orders")]
        [Authorize(Roles = "client")]
        public async Task<IActionResult> AddOrder([FromBody] AddOrderCommand addOrderCommand)
        {
            var userId = _userIdFromTokenProvider.GetUserIdFromContextOrThrow(HttpContext);
            var addedSuccessfully = await _mediator.Send(new AddOrderCommandWithClientId(addOrderCommand, userId));
            return addedSuccessfully ?
                CreatedAtAction(nameof(AddOrder), "Zapisano zamówienie") :
                BadRequest("Zapisanie nie powiodło się");
        }
    }
}
