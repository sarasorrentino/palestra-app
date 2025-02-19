import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

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

  users: any[] = []; // Temporary users list
  
/*----------------------------------------------------------------------------------------------------
    User management
----------------------------------------------------------------------------------------------------*/

  addUser(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUser(uid: any) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((x: any) => x.uid === uid) || null;
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

  getCurrentUser() {
    const currentUserID = JSON.parse(localStorage.getItem('currentUser') || 'null'); // Usa 'null' invece di '[]'
    if (!currentUserID) {
      console.log("Nessun utente attualmente loggato.");
      return null;
    }
    
    const user = this.getUser(currentUserID);
    console.log("Current user:", user);
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
  }

  resetCurrentUser() {
    localStorage.setItem('currentUser', '[]');
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

}
