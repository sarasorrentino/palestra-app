import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutStorageService {

  constructor() { }
  
  restTimeStatus: boolean = false;

  stopRestTime() {
    this.restTimeStatus = false;
  }

  toggleRestTimeStatus() {
    this.restTimeStatus = !this.restTimeStatus;
    return this.restTimeStatus;
  }

  initializeCompletedSeries(exercises: any) {
    let completedSeries = new Array(exercises.length).fill(1);
    localStorage.setItem('completedSeries', JSON.stringify(completedSeries));
  }

  currentExercise(exerciseUid: number) {
    localStorage.setItem('currentExercise', JSON.stringify(exerciseUid));
  }

  initialiseCurrentExerciseIndex(){
    localStorage.setItem('currentExerciseIndex', JSON.stringify(0));
  }

  updateCurrentExerciseIndex(index: number){
    localStorage.setItem('currentExerciseIndex', JSON.stringify(index));
  }

  updateCompletedSeries() {
    let completedSeries = JSON.parse(localStorage.getItem('completedSeries') || '[]');
    let currentExerciseIndex = JSON.parse(localStorage.getItem('currentExerciseIndex') || '');
    completedSeries[currentExerciseIndex]++;
    localStorage.setItem('completedSeries', JSON.stringify(completedSeries));
  }

  updateWorkoutHistory(duration: number) {
    let minutes = Math.floor(duration/60);

    const workoutHistoryData = JSON.parse(localStorage.getItem('workoutHistoryData') || '[]');
    const workoutEntry = {
      date: new Date().toISOString().split('T')[0],  // Ottieni la data in formato YYYY-MM-DD
      duration: minutes
    };
    workoutHistoryData.push(workoutEntry);

    localStorage.setItem('workoutHistoryData', JSON.stringify(workoutHistoryData));
  }

  updateTotalWorkoutTime(): number {
    const workoutHistoryData = JSON.parse(localStorage.getItem('workoutHistoryData') || '[]');

    let total = 0;
    for(let i = 0; i < workoutHistoryData.length; i++){
      total += workoutHistoryData[i].duration;
    }
    //localStorage.setItem('totalWorkoutTime', JSON.stringify(total)); UPDATE TOTAL TIME VALUE PER USER
   //console.log(total);
    return total;
  }

  convertSecondsToHoursMinutes(): string {
    const hours = Math.floor(this.updateTotalWorkoutTime() / 3600);
    return `${hours}h\n${this.updateTotalWorkoutTime().toString().padStart(2, '0')}`;
  }
}
