import { Injectable } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { PlansStorageService } from './plans-storage.service';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatsStorageService {

  constructor(private userStorage: UserStorageService) { }

  getRecords() {
    let records = JSON.parse(localStorage.getItem('loadRecords') || '[]');
    //console.log("All records: ");
    //console.log(records);
    let userRecords = records.find((r: any) => r.uid === this.userStorage.getCurrentUserId());
    //console.log("User records: ");
    //console.log(userRecords);
    return userRecords.records;
  }

  addRecord(newData: { id: number, name: string; newLoad: number; newDate: string }): void {
    const userRecords = this.getRecords();  
    let existingExerciseIndex = userRecords.findIndex((exercise: any) => exercise.id === newData.id);
    let records = JSON.parse(localStorage.getItem('loadRecords') || '[]');
    let userIndex = records.findIndex((r: any) => r.uid === this.userStorage.getCurrentUserId());
    
    records[userIndex].records[existingExerciseIndex].loads.push(newData.newLoad);
    records[userIndex].records[existingExerciseIndex].dates.push(newData.newDate);
    localStorage.setItem('loadRecords', JSON.stringify(records));
  }

  getRecordForExercise(exerciseId: number) {
    const records = this.getRecords() || [];
    let existingExerciseIndex = records.findIndex((exercise: any) => exercise.id === exerciseId);
    return records[existingExerciseIndex].loads[records[existingExerciseIndex].loads.length-1] || 0; // Return last record or 0
  }

  getWorkoutHistoryData(){
    return JSON.parse(localStorage.getItem('workoutHistoryData') || '[]');
  }

}
