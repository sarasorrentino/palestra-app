import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private selectedDaySubject = new BehaviorSubject<any[]>(this.getSelectedDay());
  selectedDay$ = this.selectedDaySubject.asObservable();

  private cardVisibilitySubject = new BehaviorSubject<boolean>(this.getCardVisibilityStatus());
  cardVisibility$ = this.cardVisibilitySubject.asObservable();

  setCardVisibilityStatus(value: boolean) {
    localStorage.setItem('cardVisibility', JSON.stringify(value));
    this.cardVisibilitySubject.next(value);
  }

  getCardVisibilityStatus() {
    return JSON.parse(localStorage.getItem('cardVisibility') || 'false'); // Default: false
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
    for(let i = 0; i < plan.n_days; i++){
      plan.days.push([]);
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
    return plans.filter((plan: any) => plan.ownerID === JSON.parse(localStorage.getItem('currentUser') || ''));
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

  resetCurrentPlan() {
    localStorage.setItem('currentPlan', '');
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

  resetSelectedPlan() {
    localStorage.setItem('selectedPlan', '');
  }

  setSelectedDay(day: number) {
    let currentUserID = JSON.parse(localStorage.getItem('currentUser') || '[]');
    let selectedDays =  JSON.parse(localStorage.getItem('selectedDays') || '[]');
    let userIndex = selectedDays.findIndex((u: any) => u.uid === currentUserID);
    selectedDays[userIndex].selectedDay = day;
    localStorage.setItem('selectedDays', JSON.stringify(selectedDays));
  }

  getSelectedDay() {
    let currentUserID = JSON.parse(localStorage.getItem('currentUser') || '[]');
    let selectedDays =  JSON.parse(localStorage.getItem('selectedDays') || '[]');
    let selectedDay = selectedDays.find((d: any) => d.uid === currentUserID);
    return selectedDay.selectedDay;
  }

  addExerciseToDay(planId: number, dayIndex: number, exercise: any) {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    let plan = plans.find((p: any) => p.uid === planId);
    //console.log(plan);
    if (plan) {
      let day = plan.days[dayIndex];
      //console.log(day);
      day.push(exercise);
      localStorage.setItem('plans', JSON.stringify(plans));
      this.updatePlans(plans);
    }
  }
  
  removeExerciseFromDay(planId: number, dayIndex: number, exerciseId: number) {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    let planIndex = plans.findIndex((p: any) => p.uid === planId);

    if (planIndex !== -1) {
        let plan = plans[planIndex];
        //console.log("Piano prima della modifica:", plan);

        if (plan.days[dayIndex]) {
            plan.days[dayIndex] = plan.days[dayIndex].filter((exercise: any) => exercise.uid !== exerciseId);
        }

        //console.log("Piano dopo la modifica:", plan);
        plans[planIndex] = plan;
        localStorage.setItem('plans', JSON.stringify(plans));
        this.updatePlans(plans);
    }
  }

  // Create hash code from string (email)
  generateHash(title: string): number {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = (hash << 5) - hash + title.charCodeAt(i);
      hash |= 0; // 32-bit integer
    }
    return Math.abs(hash); // No negative numbers
  }

}
