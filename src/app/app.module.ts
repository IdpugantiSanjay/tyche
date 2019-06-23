import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDividerModule } from '@angular/material/divider';

import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatProgressBarModule,
  MAT_DATE_LOCALE,
  MatSnackBar
} from '@angular/material';
import { RecordListComponent } from './record-list/record-list.component';
import { NumericDirective } from './directives/numeric.directive';
import { MaxLengthDirective } from './directives/max-length.directive';
import { NewRecordComponent } from './new-record/new-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecordComponent } from './record/record.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { SettingsComponent } from './settings/settings.component';

import { DateDirective } from './directives/date.directive';
import { ErrorHandlerService } from './services/error-handler.service';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment, publicKey } from '../environments/environment';

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { ChartModule, UIChart } from 'primeng/chart';
import { ChartsComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { RegsiterComponent } from './regsiter/regsiter.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TransactionTimelineComponent } from './transaction-timeline/transaction-timeline.component';
import { RecordDeleteConfirmationComponent } from './record-delete-confirmation/record-delete-confirmation.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AuthenticationInterceptorService } from './services/authentication-interceptor.service';

@NgModule({
  entryComponents: [RecordDeleteConfirmationComponent, NewAccountComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    RecordListComponent,
    NumericDirective,
    MaxLengthDirective,
    NewRecordComponent,
    RecordComponent,
    StatisticsComponent,
    SettingsComponent,
    DateDirective,
    ChartsComponent,
    LoginComponent,
    RegsiterComponent,
    StatisticComponent,
    TransactionTimelineComponent,
    RecordDeleteConfirmationComponent,
    AccountsComponent,
    NewAccountComponent,
    AccountInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressBarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxMaterialTimepickerModule.forRoot(),
    ChartModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(push: SwPush, snackbar: MatSnackBar) {
    push.messages.subscribe((msg: any) => {
      const title = msg.title;

      Notification.requestPermission().then(() => {
        if (Notification.permission === 'granted') {
          new Notification(JSON.stringify(title));
        }
      });
    });

    push.requestSubscription({ serverPublicKey: publicKey }).then(pushSubscription => send(pushSubscription));
  }
}

async function send(pushSubscription: PushSubscription) {
  await fetch('http://localhost:3000/subscribe', {
    method: 'POST',
    body: JSON.stringify(pushSubscription),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
