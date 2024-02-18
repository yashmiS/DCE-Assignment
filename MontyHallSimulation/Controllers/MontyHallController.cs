using Microsoft.AspNetCore.Mvc;
using MontyHallSimulation.Interfaces;

namespace MontyHallSimulation.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MontyHallController : ControllerBase
{
    private readonly IMontyHallService _montyHallService;

    public MontyHallController(IMontyHallService montyHallService)
    {
        _montyHallService = montyHallService;
    }

    [HttpPost]
    public async Task<IActionResult> SimulateGames(int numberOfSimulations, bool changeDoor)
    {
        var result = await _montyHallService.SimulateGame(numberOfSimulations, changeDoor);
        return Ok(result);
    }
}