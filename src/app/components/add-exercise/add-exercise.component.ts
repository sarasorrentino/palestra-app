import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonicModule, IonTitle, IonToolbar, ModalController } from '@ionic/angular';
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

  ngOnInit() {
    this.http.get<any[]>('/assets/database/exercises_db.json').subscribe(data => {
      this.exercises = data;
    });
  }

  name!: string;
  currentStep = 1;

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  add() {
    console.log("Exercise added!");
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

  series = 0;
  repeats = 0;
  rest_time = 0;

  incrementSeries() {
    this.series++;
  }

  decrementSeries() {
    this.series--;
  }

  incrementRepeats() {
    this.repeats++;
  }

  decrementRepeats() {
    this.repeats--;
  }

  incrementRestTime() {
    this.rest_time+=30;
  }

  decrementRestTime() {
    this.rest_time-=30;
  }

  selectedExercise: string | null = null;

  selectExercise(exercise: string) {
    this.selectedExercise = exercise;
    localStorage.setItem('selectedExercise', JSON.stringify(exercise));
  }
}
