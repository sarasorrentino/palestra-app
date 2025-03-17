import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-new-exercise-card',
  templateUrl: './new-exercise-card.component.html',
  styleUrls: ['./new-exercise-card.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class NewExerciseCardComponent  implements OnInit {

  @Output() visibilityChanged = new EventEmitter<boolean>();

  isCardVisible = false;

  emitVisibility() {
    this.visibilityChanged.emit(this.isCardVisible);
  }

  exercises: any[] = [];

  newExercise = {
    uid: 0,
    index: 0,
    planID: 0,
    series: 0,
    repeats: 0,
    restTime: 0,
  }

  firstSelection: boolean = true;

  constructor(private modalCtrl: ModalController, private http: HttpClient, private planStorage: PlansStorageService, private router: Router, private renderer: Renderer2) {}
  
  closeCard() {
    this.isCardVisible = false;
    this.emitVisibility();
    this.renderer.removeClass(document.body, 'tab-bar-hidden'); // Mostra la tab bar
  }

  ngOnInit() {
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercises = data;
    });
  }

  goBack() {
    this.firstSelection = true;
  }

  goNext() {
    this.firstSelection = false;
  }

  isSelectionValid(): boolean {
    //console.log(this.plan);
    return !!(
      this.newExercise.uid
    );
  }

  isExerciseValid(): boolean {
    //console.log(this.plan);
    return !!(
      this.newExercise.uid &&
      this.newExercise.series &&
      this.newExercise.repeats &&
      this.newExercise.restTime
    );
  }

  add() {
    this.newExercise.index = this.exercises.length;
    this.newExercise.planID = this.planStorage.getSelectedPlan().uid;
    this.planStorage.addExerciseToDay(this.newExercise.planID, this.planStorage.getSelectedDay(), this.newExercise);
    //console.log(this.newExercise);
    //console.log("Day: " + this.planStorage.getSelectedDay());
    this.closeCard();
  }

  incrementSeries() {
    this.newExercise.series++;
  }

  decrementSeries() {
    if(this.newExercise.series > 1)
      this.newExercise.series--;
  }

  incrementRepeats() {
    this.newExercise.repeats++;
  }

  decrementRepeats() {
    if(this.newExercise.repeats > 1)
      this.newExercise.repeats--;
  }

  incrementRestTime() {
    this.newExercise.restTime+=30;
  }

  decrementRestTime() {
    if(this.newExercise.restTime > 29)
      this.newExercise.restTime-=30;
  }

  selectedExercise: number | null = null;

  selectExercise(exerciseCode: number) {
    this.newExercise.uid = exerciseCode;
    this.selectedExercise = exerciseCode;
    //localStorage.setItem('selectedExercise', JSON.stringify(exercise));
  }

}
