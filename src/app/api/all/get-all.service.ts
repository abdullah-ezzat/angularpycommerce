import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  private all = 'https://pycommerceapp.herokuapp.com/api/all/';

  constructor(private http: HttpClient) {}

  getHomeProducts(page, selectedValues, search, categoryId) {
    return this.http.get(
      this.all +
        'getHomeProducts' +
        '/page=' +
        page +
        '/specValue=' +
        selectedValues +
        '/search=' +
        search +
        '/category=' +
        categoryId
    );
  }

  getProductsPage(page, search) {
    return this.http.get(this.all + 'getProductsPage/' + page + '/' + search);
  }

  getMaxPage(selectedValues, search, categoryId) {
    return this.http.get(
      this.all +
        'getMaxPage' +
        '/specValue=' +
        selectedValues +
        '/search=' +
        search +
        '/category=' +
        categoryId
    );
  }
}
