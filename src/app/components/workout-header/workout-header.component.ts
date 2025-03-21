import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-workout-header',
  templateUrl: './workout-header.component.html',
  styleUrls: ['./workout-header.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class WorkoutHeaderComponent  implements OnInit {

  constructor(private router: Router, private alertController: AlertController, private userStorage: UserStorageService) {
    addIcons({ logOutOutline });
  }

  @Input() currentExerciseIndex: number = 0;
  @Input() n_exercises: number = 0;
  @Input() workoutTimer: any = '';

  ngOnInit() {
    this.getWorkoutTimer();
  }

  async quit() {
    this.pauseResumeTimer();
    const alert = await this.alertController.create({
      header: 'Do you want to quit this workout?',
      message: '',
      buttons: [
        {
          text: 'Confirm',
          role: 'destructive',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/tabs/home']);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.pauseResumeTimer();
          }
        }
      ]
    });
    await alert.present();
  }

  getProgressPercentage(): number {
    return Math.floor((this.currentExerciseIndex / this.n_exercises) * 100);
  }
  
  timerInterval: any;
  isPaused: boolean = false;

  getWorkoutTimer() {
    this.timerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.workoutTimer++;
      }
    }, 1000);
  }

  pauseResumeTimer() {
    this.isPaused = !this.isPaused;
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.workoutTimer / 60);
    const seconds = this.workoutTimer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
