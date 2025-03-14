import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonItemSliding, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';

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
  exerciseDB: any[] = [];

  ngOnInit() {
    // Get plan
    this.planStorage.selectedPlan$.subscribe(plan => {
      this.selectedPlan = plan;
      this.days = this.selectedPlan.days;
      this.exercises = this.days[this.planStorage.getSelectedDay()].exercises;
    });

    // Get exercisesDB
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exerciseDB = data;
      console.log("Exercise DB Loaded!");
    });
    this.waitForDBReady();
  }
  
  waitForDBReady() {
    const interval = setInterval(() => {
      if (this.exerciseDB && this.exerciseDB.length > 0) {
        console.log('exerciseDB is now ready');
        clearInterval(interval); // Ferma il ciclo una volta che il DB è caricato
      } else {
        console.warn('Waiting for exerciseDB...');
      }
    }, 1000); // Controlla ogni secondo
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
    //console.log("Stampa esercizi: ");
    //console.log(this.exercises);
  }

  getExerciseX(exerciseID: any, code: number) {
    // Verifica se l'esercizio DB è pronto
    if (!this.exerciseDB || this.exerciseDB.length === 0) {
      console.warn("exerciseDB is not loaded yet.");
      return "Loading...";
    }

    const findEx = this.exerciseDB.find((ex: any) => ex?.id === exerciseID);
    if (!findEx) {
      console.warn(`No exercise found with ID: ${exerciseID}`);
      return "Exercise not found";
    }

    switch (code) {
      case 0:
        return findEx.name || "Name not available";
      case 1:
        return findEx.muscleGroup || "Muscle group not available";
      case 2:
        return findEx.description || "Description not available";
      case 3:
        return findEx.image || "Image not available";
      default:
        console.warn(`Invalid code provided: ${code}`);
        return "Invalid code";
    }
  }
  
  getExerciseImage(exerciseID: number) {
    const findEx = this.exerciseDB.find((ex: any) => ex.uid === exerciseID);
    return findEx.image;
  }

  async addExercise(exerciseId: number){
    this.planStorage.addExerciseToDay(this.planStorage.getSelectedPlan().uid, this.planStorage.getSelectedDay(), exerciseId);

    // Update plan
    let plan = this.planStorage.getCurrentPlan();
    this.selectedPlan = plan;
    this.days = this.selectedPlan.days;
    this.exercises = this.days[this.planStorage.getSelectedDay()].exercises;
  }

  async deleteExercise(exerciseId: number, slidingItem: IonItemSliding){
    this.planStorage.removeExerciseFromDay(this.planStorage.getSelectedPlan().uid, this.planStorage.getSelectedDay(), exerciseId);
    //console.log("Cancello: " + exerciseId);

    // Update plan
    let plan = this.planStorage.getCurrentPlan();
    this.selectedPlan = plan;
    this.days = this.selectedPlan.days;
    this.exercises = this.days[this.planStorage.getSelectedDay()].exercises;
    slidingItem.close();
  }

}
