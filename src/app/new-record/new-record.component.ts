import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http.service";
import { Subscription, Observable } from "rxjs";
import { user, endpoint } from "src/environments/environment";

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-new-record",
  templateUrl: "./new-record.component.html",
  styleUrls: ["./new-record.component.css"]
})
export class NewRecordComponent implements OnInit {
  foods: Food[] = [
    { value: "Food and Drinks", viewValue: "Food and Drinks" },
    { value: "Travel", viewValue: "Travel" },
    { value: "Health and Body Care", viewValue: "Health and Body Care" }
  ];

  recordTypes = [
    { value: "Income", viewValue: "Income" },
    { value: "Expenditure", viewValue: "Expenditure" }
  ];

  hours = [];
  mins = [];
  periods = ["AM", "PM"];
  defaultMins: string = "00";
  defaultHour: string = "12";
  defaultPeriod = "PM";

  categories$: Observable<any>;

  constructor(private httpService: HttpService) {
    this.categories$ = httpService.getRequest(`${endpoint}${user.name}/categories`);
  }

  ngOnInit() {
    for (let i = 1; i <= 12; i++) this.hours.push(i);
    for (let i = 0; i <= 60; i++) this.mins.push(i.toString().padStart(2, "0"));
  }
}
