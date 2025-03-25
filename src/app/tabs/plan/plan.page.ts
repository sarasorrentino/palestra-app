import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonItemSliding, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  standalone: false
})
export class PlanPage implements OnInit {

  constructor(private router: Router, private userStorage: UserStorageService, private planStorage: PlansStorageService, private http: HttpClient, private renderer: Renderer2) { }

  selectedPlan: any;
  days: any;
  exercises: any;
  exerciseDB: any[] = [];

  isCardVisible = false;

  openCard() {
    this.planStorage.setCardVisibilityStatus(true);
    this.renderer.addClass(document.body, 'tab-bar-hidden'); // Hide tab bar
  }
  
  closeCard() {
    this.planStorage.setCardVisibilityStatus(false);
    this.renderer.removeClass(document.body, 'tab-bar-hidden'); // Show tab bar
  }

  ngOnInit() {
    this.planStorage.cardVisibility$.subscribe(value => {
      this.isCardVisible = value;
    });

    /*
    // Get plan
    this.selectedPlan = this.planStorage.getSelectedPlan();
    //console.log("plan");
    //console.log(this.selectedPlan);
    this.days = this.selectedPlan.days;
    //console.log("days");
    //console.log(this.selectedPlan.days);
    this.exercises = this.days[this.planStorage.getSelectedDay()];
    //console.log("exercises from selected day");
    //console.log(this.exercises);
    */
    
    this.planStorage.selectedPlan$.subscribe(plan => {
      this.selectedPlan = plan;
      this.days = this.selectedPlan.days;
      this.exercises = this.days[this.planStorage.getSelectedDay()];
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
  selectedDay: number = this.planStorage.getSelectedDay(); // Current day selected
  getArray(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i);
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    localStorage.setItem('selectedExercise', '');
  }
  
  setSelectedDay() {
    let existingSelectedDays = JSON.parse(localStorage.getItem('selectedDays') || '[]');
    const currentUserId = this.userStorage.getCurrentUserId();
    let userIndex = existingSelectedDays.findIndex((u: any) => u.uid === currentUserId);
    existingSelectedDays[userIndex].selectedDay = this.selectedDay;
    localStorage.setItem('selectedDays', JSON.stringify(existingSelectedDays));
    this.exercises = this.days[this.selectedDay] || '[]';
  }

  getExerciseX(exerciseID: any, code: number) {
    // Verifica se l'esercizio DB è pronto
    if (!this.exerciseDB || this.exerciseDB.length === 0) {
      console.warn("exerciseDB is not loaded yet.");
    }

    const findEx = this.exerciseDB.find((ex: any) => ex?.id === exerciseID);
    if (!findEx) {
      console.warn(`No exercise found with ID: ${exerciseID}`);
    }
    else {
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
  }
  
  getExerciseImage(exerciseID: number) {
    const findEx = this.exerciseDB.find((ex: any) => ex.uid === exerciseID);
    return findEx.image;
  }

  async addExercise(exerciseId: number){
    this.planStorage.addExerciseToDay(this.planStorage.getSelectedPlan().uid, this.planStorage.getSelectedDay(), exerciseId);
    this.updatePlan();
  }

  async deleteExercise(exerciseId: number, slidingItem: IonItemSliding){
    this.planStorage.removeExerciseFromDay(this.planStorage.getSelectedPlan().uid, this.planStorage.getSelectedDay(), exerciseId);
    //console.log("Cancello: " + exerciseId);
    this.updatePlan();
    slidingItem.close(); 
  }

  updatePlan() {
    // Update plan
    let plan = this.planStorage.getSelectedPlan();
    this.selectedPlan = plan;
    this.days = this.selectedPlan.days;
    this.exercises = this.days[this.planStorage.getSelectedDay()];
  }

  getNumberOfExercisesByDay() {
    //console.log(this.exercises);
    //console.log("numero esercizi per giorno selezionato: " + this.exercises.length);
    //console.log(this.exercises.length);
    return this.exercises.length;
  }

  navToWorkout() {
    this.router.navigateByUrl('/countdown', { replaceUrl: true });
  }
}
