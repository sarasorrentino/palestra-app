import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.page.html',
  styleUrls: ['./profile-data.page.scss'],
  standalone: false,
})
export class ProfileDataPage implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  user = {
    email: "",
    password: "",
    name: "",
    surname: "",
    gender: "",
    weight: "",
    birthDate: "",
    goal: ""
  };

  start = 30;
  end = 250;
  @Input() numbers: any = Array.from({ length: this.end - this.start + 1 }, (_, i) => i + this.start);

  currentValue = 'javascript';

  onIonChange(event: CustomEvent) {
    this.currentValue = event.detail.value;
  }

  onDidDismiss(event: CustomEvent) {
    console.log('didDismiss', JSON.stringify(event.detail));
  }

  ngOnInit() {
  }

  register() {
    this.localStorage.user.name = this.user.name;
    this.localStorage.user.surname = this.user.surname;
    this.localStorage.user.gender = this.user.gender;
    this.localStorage.user.birthDate = this.user.birthDate;
    this.localStorage.user.weight = this.user.weight;
    this.localStorage.user.goal = this.user.goal;

    this.localStorage.setUser();
    localStorage.setItem('currentUser', this.user.name);
    this.router.navigate(['tabs/home']);
  }

  back () {
    this.router.navigate(['register']);
  }
  
  updateBirthDate(event: any) {
    this.user.birthDate = event.detail.value;
    console.log('Selected birth date:', this.user.birthDate);
  }

  isFormValid(): boolean {
    console.log(this.user);
    return !!(
      this.user.name &&
      this.user.surname &&
      this.user.gender &&
      this.user.birthDate &&
      this.user.weight &&
      this.user.goal
    );
  }
}
