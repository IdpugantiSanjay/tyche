import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { categoryUrl } from 'src/environments/environment';
import { localhostUrl, user } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpService: HttpService) {}

  private get categoryUrl() {
    return `${localhostUrl}${user.name}/categories`;
  }

  categories(type: 'Income' | 'Expense') {
    return this.httpService.getRequest(`${this.categoryUrl}/${type}`);
  }
}
