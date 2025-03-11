import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { WorkoutStorageService } from 'src/app/services/workout-storage.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
  standalone: false
})
export class SummaryPage implements OnInit {

  selectedPlan: any;
  selectedDay: any
  workoutDuration: any;

  workoutTime: string = '';
  totalExerciseNumber: number = 0;

  constructor(private planStorage: PlansStorageService, private router: Router, private workoutStorage: WorkoutStorageService) { 
    this.selectedPlan = this.planStorage.getCurrentPlan();
    this.selectedDay = this.planStorage.getSelectedDay()+1;
    this.workoutDuration = localStorage.getItem('duration');
  }

  ngOnInit() {
    this.workoutTime = this.workoutStorage.convertSecondsToHoursMinutes();
    this.totalExerciseNumber = this.selectedPlan.days[this.selectedDay].exercises.length+1;
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.workoutDuration / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString()}h\n${minutes.toString().padStart(2, '0')}`;
  }

  updateWorkoutDay(){
    const totalDays = this.selectedPlan.n_days;
    let followingDay = this.selectedDay-1;
    if(followingDay === totalDays-1){
      followingDay = 0;
    }
    else {
      followingDay+=1;
    }
    localStorage.setItem('selectedDay', JSON.stringify(followingDay));
  }

  navToHome() {
    this.updateWorkoutDay();
    this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }
}