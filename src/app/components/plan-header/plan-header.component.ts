import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(private location: Location) { }

  ngOnInit() {}

  goBack() {
    this.location.back(); // Torna alla pagina precedente
  }
}
