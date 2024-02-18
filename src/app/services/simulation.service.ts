import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SimulationService {
  private apiUrl = 'https://localhost:7057/api/MontyHall';

  constructor(private http: HttpClient) {}

  simulateMontyHall(
    numberOfSimulations: number,
    changeDoor: boolean
  ): Observable<any> {
    const url = `${this.apiUrl}?numberOfSimulations=${numberOfSimulations}&changeDoor=${changeDoor}`;
    return this.http.post<any>(url, {});
  }
}
