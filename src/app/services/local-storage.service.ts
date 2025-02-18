import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  /*----------------------------------------------------------------------------------------------------
    Local variables
  ----------------------------------------------------------------------------------------------------*/

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
  users: any[] = []; // Temporary users list

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
    User management
  ----------------------------------------------------------------------------------------------------*/

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

  updateUser(updatedUser: any){
    
    let users = JSON.parse(localStorage.getItem('users') || '[]'); // List of all users
    const userIndex = users.findIndex((user: any) => user.email === updatedUser.email);

    if (userIndex !== -1) {
      
      users[userIndex] = { ...users[userIndex], ...updatedUser }; // Update user
      localStorage.setItem('users', JSON.stringify(users)); // Update users list
    } else {
      console.warn('Utente non trovato');
    }
  }

  /*----------------------------------------------------------------------------------------------------
    Current user management
  ----------------------------------------------------------------------------------------------------*/
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '[]');
  }

  setCurrentUser(userEmail: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((x: any) => x.email === userEmail);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return JSON.stringify(user);
  }

  resetCurrentUser() {
    localStorage.setItem('currentUser', '[]');
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