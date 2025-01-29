import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.page.html',
  styleUrls: ['./profile-data.page.scss'],
  standalone: false,
})
export class ProfileDataPage implements OnInit {

  constructor(private router: Router) { }

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
    this.router.navigate(['home']);
  }

  back () {
    this.router.navigate(['register']);
  }

}
