import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecordListComponent } from './record-list/record-list.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { SettingsComponent } from './settings/settings.component';
import { ChartsComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { RegsiterComponent } from './regsiter/regsiter.component';
import { AuthService } from './services/auth.service';
import { TransactionTimelineComponent } from './transaction-timeline/transaction-timeline.component';

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
    ],
    canActivate: [AuthService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegsiterComponent },
  {
    path: 'transaction-timeline',
    component: TransactionTimelineComponent
    // canActivate: [AuthService]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
