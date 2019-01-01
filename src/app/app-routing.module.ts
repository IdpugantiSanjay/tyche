import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecordListComponent } from './record-list/record-list.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartsComponent } from './chart/chart.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'list',
        component: RecordListComponent
      },
      {
        path: 'new-record',
        component: NewRecordComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'charts',
        component: ChartsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
