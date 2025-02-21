import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserStorageService } from './user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlansStorageService {
  
  // Observables
  private plansSubject = new BehaviorSubject<any[]>(this.getPlans());
  plans$ = this.plansSubject.asObservable();

  updatePlans(newPlans: any) {
    this.plansSubject.next(newPlans);
  }

  private currentPlanSubject = new BehaviorSubject<any[]>(this.getCurrentPlan());
  currentPlan$ = this.currentPlanSubject.asObservable();

  updateCurrentPlan(newPlan: any) {
    this.currentPlanSubject.next(newPlan);
  }

  private selectedPlanSubject = new BehaviorSubject<any[]>(this.getSelectedPlan());
  selectedPlan$ = this.selectedPlanSubject.asObservable();

  updateSelectedPlan(newPlan: any) {
    this.selectedPlanSubject.next(newPlan);
  }

  constructor() { }

  public plan = {
    uid: 0,
    ownerID: 0,
    isCurrent: false,
    title: "",
    description: "",
    n_days: 3,
    days: []
  }

  public currentPlan = 0;

  getPlans(): any[] {
    return JSON.parse(localStorage.getItem('plans') || '[]');
  }

  setPlan(plan: any){
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    if (plans.length === 0){
      plan.isCurrent = true;
      this.setCurrentPlan(plan.uid);
    }
    plans.push(plan);
    localStorage.setItem('plans', JSON.stringify(plans));
    this.updatePlans(plans);
    this.updateCurrentPlan(this.getCurrentPlan());
  }

  removePlan(planID: number) {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]'); // Get current plan list
    let updatedList = plans.filter((plan: any) => plan.uid !== planID); // Update list removing the selected plan
    localStorage.setItem('plans', JSON.stringify(updatedList));
    this.updatePlans(updatedList);
  }

  getPlansByUser(userId: number) {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    return plans.filter((plan: any) => plan.ownerID === userId);
  }

  getCurrentUserPlans() {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    return plans.filter((plan: any) => plan.ownerID === localStorage.getItem('currentUser'));
  }

  setCurrentPlan(planID: number) {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    plans = plans.map ((plan:any) => ({
      ...plan,
      isCurrent: plan.uid === planID
    }));
    localStorage.setItem('plans', JSON.stringify(plans));
    this.updatePlans(plans);
    localStorage.setItem('currentPlan', JSON.stringify(planID));
    this.updateCurrentPlan(this.getCurrentPlan());
    //return JSON.stringify(user);
  }

  getCurrentPlanID(): number {
    return JSON.parse(localStorage.getItem('currentPlan') || '[]');
  }

  getCurrentPlan() {
    const currentPlanID = JSON.parse(localStorage.getItem('currentPlan') || '[]');
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const plan = plans.find((x: any) => x.uid === currentPlanID);
    return plan;
  }

  setSelectedPlan(planID: number) {
    localStorage.setItem('selectedPlan', JSON.stringify(planID));
    this.updateSelectedPlan(this.getSelectedPlan());
  }

  getSelectedPlan() {
    const selectedPlanID = JSON.parse(localStorage.getItem('selectedPlan') || '[]');
    const plans = JSON.parse(localStorage.getItem('plans') || '[]');
    const plan = plans.find((x: any) => x.uid === selectedPlanID);
    return plan;
  }

  getSelectedDay() {
    return JSON.parse(localStorage.getItem('selectedDay') || '[]');
  }

  addExerciseToDay(planId: number, dayIndex: number, exercise: any) {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    let plan = plans.find((p: any) => p.uid === planId);

    if (plan) {
      let day = plan.days.find((d: any) => d.dayIndex === dayIndex);
      if (day) {
        day.exercises.push(exercise);
      } else {
        plan.days.push({
          dayIndex,
          exercises: [exercise]
        });
      }
      localStorage.setItem('plans', JSON.stringify(plans));
    }
  }

  // Create hash code from email
  generateHash(title: string): number {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = (hash << 5) - hash + title.charCodeAt(i);
      hash |= 0; // 32-bit integer
    }
    return Math.abs(hash); // No negative numbers
  }

}
