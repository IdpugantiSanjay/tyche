import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./home/home.component";
import { LayoutModule } from "@angular/cdk/layout";
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatRadioButton,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { RecordListComponent } from "./record-list/record-list.component";
import { NumericDirective } from "./directives/numeric.directive";
import { MaxLengthDirective } from "./directives/max-length.directive";
import { NewRecordComponent } from "./new-record/new-record.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RecordComponent } from './record/record.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecordListComponent,
    NumericDirective,
    MaxLengthDirective,
    NewRecordComponent,
    RecordComponent
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
