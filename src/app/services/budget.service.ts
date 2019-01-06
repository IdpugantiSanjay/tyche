import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Budget } from '../models/budget';
import { localhostUrl } from 'src/environments/environment';
import { user } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgetUrl = `${localhostUrl}${user.name}/budgets`;

  constructor(private httpService: HttpService) {}

  public saveBudgets(budgets: Budget[]) {
    return this.httpService.postRequest(`${this.budgetUrl}`, budgets);
  }

  public budgets() {
    return this.httpService.getRequest(`${this.budgetUrl}`);
  }

  public consumedBudgets() {
    return this.httpService.getRequest(`${this.budgetUrl}/consumed`);
  }
}
