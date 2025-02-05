import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public user = {
    email: "",
    password: "",
    name: "",
    surname: "",
    gender: "",
    weight: "",
    birthDate: "",
    goal: ""
  };

  users: any[] = [];
  favorites: any[] = [];

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

  setUser() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(this.user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUser(checkUser: any): any | null {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((x: any) => x.email === checkUser.email);
    return user || null;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '[]');
  }

  getPlans() {
    return JSON.parse(localStorage.getItem('plans') || '[]');
  }

  getCurrentPlan() {
    this.currentPlan = JSON.parse(localStorage.getItem('currentPlan') || '[]');
    return this.currentPlan;
  }

  setPlan() {
    let plans = JSON.parse(localStorage.getItem('plans') || '[]');
    plans.push(this.plan);
    localStorage.setItem('plans', JSON.stringify(plans));
    console.log("New plan added to the list");
  }

  updatePlans(plans: any) {
    localStorage.setItem('plans', JSON.stringify(plans));
    console.log("Plans updated");
  }

}