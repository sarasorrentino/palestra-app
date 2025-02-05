import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansUpdateService {

  private plansSubject = new BehaviorSubject<any[]>(this.getPlans());
  plans$ = this.plansSubject.asObservable(); // Observable da ascoltare nei componenti

  constructor() { }

  getPlans(): any[] {
    return JSON.parse(localStorage.getItem('plans') || '[]');
  }
}
