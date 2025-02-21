import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonicModule, IonTitle, IonToolbar, ModalController } from '@ionic/angular';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { ManualPage } from 'src/app/tabs/manual/manual.page';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],

})
export class AddExerciseComponent  implements OnInit {

  exercises: any[] = [];

  newExercise = {
    uid: 0,
    index: 0,
    planID: 0,
    series: 0,
    repeats: 0,
    restTime: 0,
  }

  ngOnInit() {
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercises = data;
    });
  }

  name!: string;
  currentStep = 1;

  constructor(private modalCtrl: ModalController, private http: HttpClient, private planStorage: PlansStorageService) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  add() {
    this.newExercise.index = this.exercises.length;
    this.newExercise.planID = this.planStorage.getSelectedPlan().uid;
    console.log("chiamata");
    this.planStorage.addExerciseToDay(this.newExercise.planID, this.planStorage.getSelectedDay(), this.newExercise);
    console.log(this.newExercise);
    console.log("Day: " + this.planStorage.getSelectedDay());
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  next() {
    return this.modalCtrl.dismiss(this.name, 'next');
  }
  
  goNext() {
    this.currentStep++;
    console.log(this.currentStep);
  }

  goBack() {
    this.currentStep--;
    console.log(this.currentStep);
  }

  incrementSeries() {
    this.newExercise.series++;
  }

  decrementSeries() {
    this.newExercise.series--;
  }

  incrementRepeats() {
    this.newExercise.repeats++;
  }

  decrementRepeats() {
    this.newExercise.repeats--;
  }

  incrementRestTime() {
    this.newExercise.restTime+=30;
  }

  decrementRestTime() {
    this.newExercise.restTime-=30;
  }

  selectedExercise: number | null = null;

  selectExercise(exerciseCode: number) {
    this.newExercise.uid = exerciseCode;
    this.selectedExercise = exerciseCode;
    //localStorage.setItem('selectedExercise', JSON.stringify(exercise));
  }
}
