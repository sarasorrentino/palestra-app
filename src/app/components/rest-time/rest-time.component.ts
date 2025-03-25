import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WorkoutStorageService } from 'src/app/services/workout-storage.service';

@Component({
  selector: 'app-rest-time',
  templateUrl: './rest-time.component.html',
  styleUrls: ['./rest-time.component.scss'],
  standalone: true,
  imports: [[IonicModule, CommonModule]]
})
export class RestTimeComponent {

  constructor(private workoutStorage: WorkoutStorageService) {}
  
  @Input() seconds: number = 30;
  maxSeconds: number = this.seconds;
  private interval: any;

  getTimerStatus() {
    return this.workoutStorage.restTimeStatus;
  }
  
  startTimer() {
    this.workoutStorage.toggleRestTimeStatus();
    this.maxSeconds = this.seconds;
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (this.seconds > 0 && this.workoutStorage.restTimeStatus) {
        this.seconds--;
      } 
      else if (this.seconds > 0 && !this.workoutStorage.restTimeStatus) {
        this.stopTimer();
        this.onTimerEnd();
        this.seconds = this.maxSeconds;
      }
      else {
        this.stopTimer();
        this.onTimerEnd();
        this.seconds = this.maxSeconds;
        this.workoutStorage.updateCompletedSeries();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.workoutStorage.restTimeStatus = false;
  }

  resetTimer() {
    this.stopTimer();
    this.seconds = this.maxSeconds;
  }

  getProgress() {
    return (this.seconds / this.maxSeconds) * 100;
  }

  onTimerEnd() {
    //console.log("Rest time over!");
  }

}
