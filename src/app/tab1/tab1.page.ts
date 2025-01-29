import { Component, Input } from '@angular/core';
import { StorageService } from '../services/app-storage.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  @Input() name: any = '';

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    this.name = await this.storageService.get('name');
  }

}
