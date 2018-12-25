import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DateDirective } from './directives/date.directive';
import { ErrorHandlerService } from './services/error-handler.service';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment, publicKey } from '../environments/environment';

@NgModule({
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
    DateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    NgxMaterialTimepickerModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ErrorHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerService,
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
