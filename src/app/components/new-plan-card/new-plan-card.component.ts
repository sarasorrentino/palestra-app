import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Renderer2 } from '@angular/core';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-new-plan-card',
  templateUrl: './new-plan-card.component.html',
  styleUrls: ['./new-plan-card.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class NewPlanCardComponent  implements OnInit {

  plan = {
    uid: 0,
    ownerID: 0,
    isCurrent: false,
    title: "",
    description: "",
    n_days: 3,
    days: [],
  }

  constructor(private userStorage: UserStorageService, private planStorage: PlansStorageService, private router: Router, private renderer: Renderer2) {}

  isCardVisible = false;

  openCard() {
    this.isCardVisible = true;
    this.renderer.addClass(document.body, 'tab-bar-hidden'); // Nasconde la tab bar
  }
  
  closeCard() {
    this.renderer.removeClass(document.body, 'tab-bar-hidden'); // Mostra la tab bar
  }

  isFormValid(): boolean {
    //console.log(this.plan);
    return !!(
      this.plan.title &&
      this.plan.description &&
      this.plan.n_days
    );
  }

  savePlan() {
    this.plan.uid = this.planStorage.generateHash(this.plan.title+this.plan.ownerID);
    this.plan.ownerID = this.userStorage.getCurrentUserId();
    this.planStorage.setPlan(this.plan);
    this.router.navigate(['tabs/plans']);
  }

  increaseDays() {
    this.plan.n_days++;
  }

  decreaseDays() {
    if(this.plan.n_days > 1)
      this.plan.n_days--;
  }

  ngOnInit() { }

}
