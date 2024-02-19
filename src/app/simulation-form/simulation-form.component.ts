import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.scss'],
})
export class SimulationFormComponent implements OnInit {
  simulationForm!: FormGroup;
  simulationResult: any;
  totalWins: number = 0;
  totalLosses: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private simulationService: SimulationService
  ) {}

  ngOnInit(): void {
    this.simulationForm = this.formBuilder.group({
      numberOfSimulations: [1, Validators.required],
      changeDoor: [true, Validators.required],
    });
    this.resetCounts();
  }

  onSubmit(): void {
    if (this.simulationForm.valid) {
      const { numberOfSimulations, changeDoor } = this.simulationForm.value;
      this.simulationService
        .simulateMontyHall(numberOfSimulations, changeDoor)
        .subscribe(
          (response) => {
            this.simulationResult = response;
            this.updateWinsAndLossesCount(response);
          },
          (error) => {
            console.error('Error during simulation:', error);
          }
        );
    }
  }

  toggleDoor(index: number): void {
    if (this.simulationResult && this.simulationResult.doors) {
      this.simulationResult.doors[index].isOpen =
        !this.simulationResult.doors[index].isOpen;
    }
    if (this.simulationResult.doors && this.simulationResult.doors[index]) {
      this.simulationResult.doors[index].isOpen =
        !this.simulationResult.doors[index].isOpen;
    }
  }

  updateWinsAndLossesCount(result: any): void {
    if (result && result.length) {
      result.forEach((simulation: { isWinner: any }) => {
        if (simulation.isWinner) {
          this.totalWins++;
        } else {
          this.totalLosses++;
        }
      });
    }
  }

  resetCounts(): void {
    this.totalWins = 0;
    this.totalLosses = 0;
  }

  resetForm(): void {
    this.simulationForm.reset({
      numberOfSimulations: 1,
      changeDoor: true,
    });
    this.simulationResult = [];
  }
}
