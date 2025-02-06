import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonicModule, IonTitle, IonToolbar, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],

})
export class AddExerciseComponent  implements OnInit {

  ngOnInit() {}

  name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
