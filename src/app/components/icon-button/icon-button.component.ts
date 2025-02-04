import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class IconButtonComponent  implements OnInit {

  constructor(private router: Router) { }

  @Input() icon: string = 'help-circle-outline';
  @Input() label: string = 'Button';
  @Input() fill: 'solid' | 'outline' = 'solid';
  @Input() action!: () => void;

  ngOnInit() {}

}
