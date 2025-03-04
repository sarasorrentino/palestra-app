import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-rest-time',
  templateUrl: './rest-time.component.html',
  styleUrls: ['./rest-time.component.scss'],
  standalone: true,
  imports: [[IonicModule, CommonModule]]
})
export class RestTimeComponent {

  seconds: number = 60; 
  maxSeconds: number = 60;
  private interval: any;

  restTime: boolean = false;

  startTimer() {
    this.restTime = true;
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.stopTimer();
        this.onTimerEnd();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.restTime = false;
  }

  resetTimer() {
    this.stopTimer();
    this.seconds = this.maxSeconds;
  }

  getProgress() {
    return (this.seconds / this.maxSeconds) * 100;
  }

  onTimerEnd() {
    console.log("Rest time over!");
  }

}
