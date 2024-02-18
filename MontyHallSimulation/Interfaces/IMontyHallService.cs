using MontyHallSimulation.Models;

namespace MontyHallSimulation.Interfaces;

public interface IMontyHallService
{
    Task<List<SimulationResult>> SimulateGame(int numberOfSimulation, bool changeDoor);
}