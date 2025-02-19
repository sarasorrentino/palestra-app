import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/

  favorites: any[] = []; // Temporary favorites exercises list

  public plan = {
    isCurrent: false,
    title: "",
    description: "",
    n_days: 3,
    days: [],
  }

  public currentPlan = {
    isCurrent: false,
    title: "",
    description: "",
    n_days: 3,
    days: [],
  }

  /*----------------------------------------------------------------------------------------------------
    Plans management
  ----------------------------------------------------------------------------------------------------*/

  getPlans() {
    return JSON.parse(localStorage.getItem('plans') || '[]');
  }

  getCurrentPlan() {
    this.currentPlan = JSON.parse(localStorage.getItem('currentPlan') || '[]');
    return this.currentPlan;
  }

  setCurrentPlan() {
    this.currentPlan = JSON.parse(localStorage.getItem('currentPlan') || '[]');
    return this.currentPlan;
  }

  setPlan() {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    if (plans.length === 0) // If the plans list is empty, the first plan inserted is also the current one
      this.plan.isCurrent = true;

    plans.push(this.plan);
    localStorage.setItem('plans', JSON.stringify(plans));
    console.log("New plan added to the list");
  }

  updatePlans(plans: any) {
    localStorage.setItem('plans', JSON.stringify(plans));
    console.log("Plans updated");
  }

  /*----------------------------------------------------------------------------------------------------
    Exercises management
  ----------------------------------------------------------------------------------------------------*/


}