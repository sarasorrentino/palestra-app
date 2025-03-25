import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  public user = {
    uid: 0,
    email: "",
    password: "",
    name: "",
    surname: "",
    gender: "",
    weight: "",
    birthDate: "",
    goal: ""
  };

  private currentUser = new BehaviorSubject<number>(0);
  private profileImage = new BehaviorSubject<string>('');

  users: any[] = []; // Temporary users list
  
  constructor() {
    this.loadProfileImage();
  }

/*----------------------------------------------------------------------------------------------------
    User management
----------------------------------------------------------------------------------------------------*/

  addUser(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    let existingTimes =  JSON.parse(localStorage.getItem('totalWorkoutTimes') || '[]');
    existingTimes.push({uid: user.uid, totalTime: 0});
    localStorage.setItem('totalWorkoutTimes', JSON.stringify(existingTimes));

    /*----------------------------------------------------------------------------------------------------
        Selected plan + day
    ----------------------------------------------------------------------------------------------------*/
    let existingSelectedDays = JSON.parse(localStorage.getItem('selectedDays') || '[]');

    // Check if initialised
    if(existingSelectedDays){ // If exists, check if user exists
      let checkUser = existingSelectedDays.find((u: any) => u.uid === this.getCurrentUserId) || null;
      if(!checkUser){ // If user does not exists, it is created
        existingSelectedDays.push({uid: user.uid, selectedDay: 0});
        localStorage.setItem('selectedDays', JSON.stringify(existingSelectedDays));
      }
      else {
        console.log("Already existing user!!!");
      }
    }
    else { // If does not exist, create + add first user (initial day = 0)
      localStorage.setItem('selectedDays', JSON.stringify({uid: user.uid, selectedDay: 0}));
    }

    /*----------------------------------------------------------------------------------------------------
        Initialise loads
    ----------------------------------------------------------------------------------------------------*/
    let exercisesDB = JSON.parse(localStorage.getItem('exercisesDB') || '[]');
    let existingRecords = JSON.parse(localStorage.getItem('loadRecords') || '[]');
    let exercisesRecords: any[] = [];

    for(let i = 1; i <= 10; i++){
      exercisesRecords.push({id: exercisesDB[i-1].id, loads: [0], dates: [new Date().toISOString().split('T')[0]]});
    }
    existingRecords.push({uid: user.uid, records: exercisesRecords});
    localStorage.setItem('loadRecords', JSON.stringify(existingRecords));
  }

  getUser(uid: number) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((x: any) => x.uid === uid) || null;
  }

  getUserByEmail(email: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((x: any) => x.email === email) || null;
  }

  checkExistingUser(checkEmail: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((x: any) => x.email === checkEmail);
    return user || null;
  }

  updateUser(updatedUser: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]'); // List of all users
    const userIndex = users.findIndex((user: any) => user.uid === updatedUser.uid);

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
  getCurrentObservableUser() {
    return this.currentUser.asObservable();
  }
  
  getCurrentUser() {
    const currentUserID = JSON.parse(localStorage.getItem('currentUser') || '[]');
    if (!currentUserID) {
      console.log("No user is currently logged in.");
      return null;
    }
    
    const user = this.getUser(currentUserID);
    //console.log("Current user:", user);
    return user;
  }

  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('currentUser') || '[]');;
  }

  setCurrentUser(userID: number) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((x: any) => x.uid === userID);
    localStorage.setItem('currentUser', JSON.stringify(user.uid));
    //return JSON.stringify(user);
  }

  updateCurrentUser(email: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((x: any) => x.email === email);
    const UID = this.generateHash(user.email);
    localStorage.setItem('currentUser', JSON.stringify(UID));
    this.currentUser.next(user);
  }

  resetCurrentUser() {
    localStorage.setItem('currentUser', '');
  }

  // Create hash code from email
  generateHash(email: string): number {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = (hash << 5) - hash + email.charCodeAt(i);
      hash |= 0; // 32-bit integer
    }
    return Math.abs(hash); // No negative numbers
  }

/*----------------------------------------------------------------------------------------------------
    Profile Image Management
  ----------------------------------------------------------------------------------------------------*/
  
  getProfileImage() {
    return this.profileImage.asObservable();
  }

  loadProfileImage() {
    let imagesData = localStorage.getItem('profile_images') || '[]';
    let images = JSON.parse(imagesData);

    const user = images.find((user: any) => user.uid === this.getCurrentUserId());

    if (user) {
      this.profileImage.next(user.string_image);
    } else {
      this.profileImage.next('');
    }
  }

}