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


  ngOnInit() {}

  quit() {

  }

  getProgressPercentage(): number {
    return Math.floor((this.currentExerciseIndex+1 / this.n_exercises) * 100);
  }
  
}
