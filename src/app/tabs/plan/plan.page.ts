import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  standalone: false
})
export class PlanPage implements OnInit {

  constructor(private planStorage: PlansStorageService, private http: HttpClient) { }

  selectedPlan: any;
  days: any;
  exercises: any;
  exerciseDB: any;

  ngOnInit() {
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exerciseDB = data;
    });

    this.planStorage.selectedPlan$.subscribe(plan => {
      this.selectedPlan = plan;
      this.days = this.selectedPlan.days;
      this.exercises = this.days[this.planStorage.getSelectedDay()].exercises;
      //console.log('Selected Plan Updated:', this.selectedPlan);
      console.log(this.exercises);
    });
  }

  /*----------------------------------------------------------------------------------------------------
    Segments management
  ----------------------------------------------------------------------------------------------------*/
  selectedDay: number | null = 0; // Current day selected
  getArray(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i);
  }

  @ViewChild(IonModal) modal!: IonModal;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    localStorage.setItem('selectedExercise', '');
  }
  
  setSelectedDay(){
    localStorage.setItem('selectedDay', JSON.stringify(this.selectedDay));
    this.exercises = this.days[this.planStorage.getSelectedDay()].exercises || '';
    console.log("Stampa esercizi: ");
    console.log(this.exercises);
  }

  getExerciseName(exerciseID: number): string {
    const findEx = this.exerciseDB.find((ex: any) => ex.uid === exerciseID);
    return findEx.name;
  }

  getExerciseMuscleGroup(exerciseID: number) {
    const findEx = this.exerciseDB.find((ex: any) => ex.uid === exerciseID);
    return findEx.muscleGroup;
  }

  getExerciseX(exerciseID: any, code: number) {
    const findEx = this.exerciseDB.find((ex: any) => {
      //console.log("Checking exercise:", ex);
      return ex.id === exerciseID;
    });
  
    if (findEx) {
      switch(code) {
        case 0:
          return findEx.name;
        case 1:
          return findEx.muscleGroup;
        case 2: 
          return findEx.description;
        case 3:
          return findEx.image;
      }
      return findEx.description;
    } else {
      console.log("No exercise found with ID:", exerciseID);
      return "Description not found";
    }
  }

  getExerciseImage(exerciseID: number) {
    const findEx = this.exerciseDB.find((ex: any) => ex.uid === exerciseID);
    return findEx.image;
  }

  deleteExercise(exerciseId: number){
    this.planStorage.removeExerciseFromDay(this.planStorage.getSelectedPlan().uid, this.planStorage.getSelectedDay(), exerciseId);
    console.log("Cancello: " + exerciseId);
  }

}
