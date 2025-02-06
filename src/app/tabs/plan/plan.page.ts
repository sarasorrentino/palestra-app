import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExerciseComponent } from 'src/app/components/add-exercise/add-exercise.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  standalone: false
})
export class PlanPage implements OnInit {

  constructor(private localStorage: LocalStorageService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  plan = this.localStorage.getCurrentPlan();

  selectedDay: number | null = null; // Memorizza il segmento selezionato
  getArray(n: number): number[] {
    return Array(n).fill(0).map((_, i) => i);
  }

  message = 'This modal example uses the modalController to present and dismiss modals.';

  async addExercise() {
    const modal = await this.modalCtrl.create({
      component: AddExerciseComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
}
