import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-plan-header',
  templateUrl: './plan-header.component.html',
  styleUrls: ['./plan-header.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PlanHeaderComponent  implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit() {}

}
