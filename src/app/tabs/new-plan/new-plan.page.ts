import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlansStorageService } from 'src/app/services/plans-storage.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.page.html',
  styleUrls: ['./new-plan.page.scss'],
  standalone: false
})
export class NewPlanPage implements OnInit {

  constructor(private router: Router, private planStorage: PlansStorageService, private userStorage: UserStorageService, private location: Location) { }

  ngOnInit() {
  }

  plan = {
    uid: 0,
    ownerID: 0,
    isCurrent: false,
    title: "",
    description: "",
    n_days: 3,
    days: [],
  }

  back () {
    //this.router.navigate(['/tabs/plans']);
    this.location.back();
  }

  next () {
    console.log("Next");
  }

  isFormValid(): boolean {
    console.log(this.plan);
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
}
