import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { PlansStorageService } from 'src/app/services/plans-storage.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
  standalone: false
})
export class PlanPage implements OnInit {

  constructor(private localStorage: LocalStorageService, private planStorage: PlansStorageService) { }

  ngOnInit() {}

  plan = this.planStorage.getCurrentPlan();
  

  /*----------------------------------------------------------------------------------------------------
    Segments management
  ----------------------------------------------------------------------------------------------------*/
  selectedDay: number | null = null; // Current day selected
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
  
}
