import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { StatsStorageService } from 'src/app/services/stats-storage.service';
import { WorkoutStorageService } from 'src/app/services/workout-storage.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
  standalone: false
})
export class WorkoutPage implements OnInit {

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel'
    },
    {
      text: 'Confirm',
      handler: (data: any) => {
        if (data.newLoad) {
          const newLoad = Number(data.newLoad);
          const newDate = new Date().toISOString().split('T')[0];
          
          this.statsStorage.addRecord({
            id: this.currentExercise.uid,
            name: this.currentExercise.name,
            newLoad: newLoad,
            newDate: newDate
          });
          this.loadExercise = this.statsStorage.getRecordForExercise(this.currentExercise.uid);
        }
      }
    }
  ];

  constructor(private planStorage: PlansStorageService, private http: HttpClient, private router: Router, private workoutStorage: WorkoutStorageService, private statsStorage: StatsStorageService) { }
  
  selectedPlan: any = '';
  selectedDay: number = 0;
  exercises: any = '';
  exercisesDB: any = '';

  exercise = {
    name: '',
    series: '',
    repeats: '',
    rest_time: ''
  }

  currentExerciseIndex: number = 0;
  currentExercise: any = '';
  loadExercise: number = 0;
  completedSeries = [];
  
  ngOnInit() {
    this.currentExerciseIndex = 0; // Reset currentExerciseIndex

    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercisesDB = data;
      this.loadCurrentExercise();
      this.startWorkoutTimer();
    });

    this.planStorage.selectedPlan$.subscribe(plan => {
      this.selectedPlan = plan;
      this.selectedDay = this.planStorage.getSelectedDay();
      this.exercises = this.selectedPlan.days[this.selectedDay].exercises;
    });

    this.workoutStorage.initializeCompletedSeries(this.exercises);
  }

  loadCurrentExercise() {
    this.currentExercise = this.exercises[this.currentExerciseIndex];
    this.workoutStorage.currentExercise(this.currentExercise.uid);
    this.currentExercise.name = this.getExerciseInfoById(this.currentExercise.uid, 0);
    this.currentExercise.muscleGroup = this.getExerciseInfoById(this.currentExercise.uid, 1);
    this.currentExercise.description = this.getExerciseInfoById(this.currentExercise.uid, 2);
    this.currentExercise.image = this.getExerciseInfoById(this.currentExercise.uid, 3);
    this.loadExercise = this.statsStorage.getRecordForExercise(this.currentExercise.uid);
  }

  updateLoad() {
    
  }

  getCurrentSeries(){
    let currentExerciseIndex = JSON.parse(localStorage.getItem('currentExerciseIndex') || '[]');
    let completedSeries = JSON.parse(localStorage.getItem('completedSeries') || '[]');
    return completedSeries[currentExerciseIndex];
  }

  nextExercise() {
    if (this.currentExerciseIndex < this.exercises.length) {
      this.currentExerciseIndex++;
      this.workoutStorage.updateCurrentExerciseIndex(this.currentExerciseIndex);
      this.loadCurrentExercise();
    }
  }

  previousExercise() {
    if (this.currentExerciseIndex > 0) {
      this.currentExerciseIndex--;
      this.workoutStorage.updateCurrentExerciseIndex(this.currentExerciseIndex);
      this.loadCurrentExercise();
    }
  }

  endWorkout() {
    localStorage.setItem('duration', JSON.stringify(this.workoutTimer));
    this.workoutStorage.updateWorkoutHistory(this.workoutTimer);
    this.workoutStorage.updateTotalWorkoutTime();
    this.router.navigateByUrl('/summary', { replaceUrl: true });
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
