import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'plans',
        children: [
          {
            path: '',
            loadChildren: () => import('./plans/plans.module').then( m => m.PlansPageModule)
          },
          {
            path: 'new-plan',
            loadChildren: () => import('./new-plan/new-plan.module').then( m => m.NewPlanPageModule)
          },
          {
            path: 'plan',
            loadChildren: () => import('./plan/plan.module').then( m => m.PlanPageModule)
          }
        ]
      },
      {
        path: 'stats',
        loadChildren: () => import('./stats/stats.module').then( m => m.StatsPageModule)
      },
      {
        path: 'manual',
        loadChildren: () => import('./manual/manual.module').then( m => m.ManualPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
