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

  ngOnInit() {}

  async quit() {
    const alert = await this.alertController.create({
      header: 'Do you want to quit this workout?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'destructive',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/tabs/home']);
          }
        }
      ]
    });
    await alert.present();
  }

  getProgressPercentage(): number {
    return Math.floor((this.currentExerciseIndex / this.n_exercises) * 100);
  }
  
}
