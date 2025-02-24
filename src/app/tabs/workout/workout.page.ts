import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: false
})
export class WorkoutPage implements OnInit {

  constructor(private planStorage: PlansStorageService, private http: HttpClient, private router: Router) { }
  
  selectedPlan: any;
  selectedDay: number = 0;
  exercises: any;
  exercisesDB: any;

  exercise = {
    name: '',
    series: '',
    repeats: '',
    rest_time: ''
  }

  currentExerciseIndex = 0;
  currentExercise: any;

  ngOnInit() {
    this.currentExerciseIndex = 0; // Reset currentExerciseIndex

    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercisesDB = data;
      //console.log(this.exercisesDB);
      this.loadCurrentExercise();
      this.startWorkoutTimer();
    });

    this.planStorage.selectedPlan$.subscribe(plan => {
      this.selectedPlan = plan;
      console.log(this.selectedPlan);
      this.selectedDay = this.planStorage.getSelectedDay();
      this.exercises = this.selectedPlan.days[this.selectedDay].exercises;
      console.log("Lista esercizi giorno: ");
      console.log(this.selectedPlan.days);
    });

  }

  loadCurrentExercise() {
    //console.log(this.currentExerciseIndex);
    this.currentExercise = this.exercises[this.currentExerciseIndex];
    //console.log(this.currentExercise.name);
    //console.log(this.getExerciseNameById(this.currentExercise.uid));
    this.currentExercise.name = this.getExerciseInfoById(this.currentExercise.uid, 0);
    this.currentExercise.muscleGroup = this.getExerciseInfoById(this.currentExercise.uid, 1);
    this.currentExercise.description = this.getExerciseInfoById(this.currentExercise.uid, 2);
    this.currentExercise.image = this.getExerciseInfoById(this.currentExercise.uid, 3);
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;
      this.loadCurrentExercise();
    } else {
      localStorage.setItem('duration', JSON.stringify(this.workoutTimer));
      this.currentExerciseIndex = 0;
      this.router.navigate(['summary']);
      //alert('Workout Completed! 🎉');
    }
  }

  getExerciseInfoById(exerciseID: number, requestCode: number) {
    if (!this.exercisesDB) {
      return 'ExerciseDB not found';
    }
  
    const exercise = this.exercisesDB.find((ex: any) => ex.id === exerciseID);
  
    if (exercise) {
      switch(requestCode) {
        case 0:
          return exercise.name;
        case 1:
          return exercise.muscleGroup;
        case 2: 
          return exercise.description;
        case 3:
          return exercise.image;
      }
    } else {
      return 'Exercise not found';
    }

  }
  
  /* -------------------------------------------------------------------
  // Duration timer management
  ------------------------------------------------------------------- */
  workoutTimer: number = 0;
  timerInterval: any;
  isPaused: boolean = false;

  startWorkoutTimer() {
    this.timerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.workoutTimer++;
      }
    }, 1000);
  }

  pauseResumeTimer() {
    this.isPaused = !this.isPaused;
  }

  stopWorkoutTimer() {
    clearInterval(this.timerInterval);
  }

  getFormattedTime(): string {
    const minutes = Math.floor(this.workoutTimer / 60);
    const seconds = this.workoutTimer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}
