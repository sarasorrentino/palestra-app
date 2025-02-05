import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-new-plan',
  templateUrl: './new-plan.page.html',
  styleUrls: ['./new-plan.page.scss'],
  standalone: false
})
export class NewPlanPage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {
  }

  plan = {
    isCurrent: false,
    title: "",
    description: "",
    n_days: 3,
    days: [],
  }

  back () {
    this.router.navigate(['/tabs/plans']);
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
    this.localStorage.plan.title = this.plan.title;
    this.localStorage.plan.description = this.plan.description;
    this.localStorage.plan.n_days = this.plan.n_days;
    this.localStorage.plan.isCurrent = this.plan.isCurrent;

    this.localStorage.setPlan();
    this.router.navigate(['tabs/plans']);
  }
}
