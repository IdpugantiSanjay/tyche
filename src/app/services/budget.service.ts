import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Budget } from '../models/budget';
import { budgetUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private httpService: HttpService) {}

  public saveBudgets(budgets: Budget[]) {
    return this.httpService.postRequest(`${budgetUrl}`, budgets);
  }

  public budgets() {
    return this.httpService.getRequest(`${budgetUrl}`);
  }

  public consumedBudgets() {
    return this.httpService.getRequest(`${budgetUrl}/consumed`);
  }
}
