import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  //users: any[] = [];
  
  /*
  setUser(user: any) {
    this.users.push(user);
    localStorage.setItem('users', this.users);
  }*/

  setUser(user: any) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUser(username: string): any | null {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((x: any) => x.username === username);
    return user || null;
  }
}
