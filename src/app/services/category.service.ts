import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { categoryUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  categories(type: 'Income' | 'Expense') {
    return this.httpService.getRequest(`${categoryUrl}/${type}`);
  }
}
