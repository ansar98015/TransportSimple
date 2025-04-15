import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  trips: { start: string, end: string, id: number }[] = [];
  newTrip = { start: '', end: '' };
  nextId = 1;

  addTrip() {
    if (this.newTrip.start && this.newTrip.end) {
      this.trips.push({
        start: this.newTrip.start.toUpperCase().substring(0, 3),
        end: this.newTrip.end.toUpperCase().substring(0, 3),
        id: this.nextId++
      });
      this.newTrip = { start: '', end: '' };
    }
  }

  isContinued(index: number): boolean {
    if (index === 0) return false;
    return this.trips[index - 1].end === this.trips[index].start;
  }

  isDuplicate(index: number): boolean {
    if (index === 0) return false;
    return this.trips[index - 1].start === this.trips[index].start &&
      this.trips[index - 1].end === this.trips[index].end;
  }

  getTripLevel(index: number): number {
    if (this.isDuplicate(index)) return 2;
    if (this.isContinued(index)) return 1;
    return 0;
  }

  removeTrip(id: number) {
    this.trips = this.trips.filter(trip => trip.id !== id);
  }

}
