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
    weight: "",
    birthDate: "",
    goal: ""
  };

  users: any[] = [];

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
  
}