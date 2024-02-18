using MontyHallSimulation.Interfaces;
using MontyHallSimulation.Models;

namespace MontyHallSimulation.Services;

public class MontyHallService : IMontyHallService
{
    public async Task<List<SimulationResult>> SimulateGame(int numberOfSimulation, bool changeDoor)
    {
        var results = new List<SimulationResult>();
        var random = new Random();

        for (int i = 0; i < numberOfSimulation; i++)
        {
            bool playerChoosesCar = random.Next(2) == 0;
            bool presenterOpenGoat = !playerChoosesCar;
            bool playerWins = (changeDoor && !presenterOpenGoat) || (!changeDoor && playerChoosesCar);

            var response = new SimulationResult
            {
                IsWinner = playerWins
            };
            
            results.Add(response);
        }

        return results;
    }
}