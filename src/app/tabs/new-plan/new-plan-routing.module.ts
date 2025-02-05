import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPlanPage } from './new-plan.page';

const routes: Routes = [
  {
    path: '',
    component: NewPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPlanPageRoutingModule {}
