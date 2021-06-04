import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  // Public Url: 'https://pycommerceapp.herokuapp.com/api/all/' \\

  private all = 'http://127.0.0.1:8000/api/all/';

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

  getProductNames(search) {
    return this.http.get(this.all + 'productNames/' + search);
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

  getAllData(fn) {
    return this.http.get(this.all + fn);
  }

  getAllCategories() {
    return this.http.get(this.all + 'mainCategories');
  }

  getAllSpecifications(CategoryId) {
    return this.http.get(this.all + 'spec/' + CategoryId);
  }

  getProSpecInv(ProductId) {
    return this.http.get(this.all + 'proSpecInv/' + ProductId);
  }

  getAllReviews(ProductId) {
    return this.http.get(this.all + 'reviews/' + ProductId);
  }

  getAllCart(CartId) {
    return this.http.get(this.all + 'cart/' + CartId);
  }

  getSubCategories() {
    return this.http.get(this.all + 'subCategories');
  }

  getOrdersFilterd(UserId, Status) {
    return this.http.get(this.all + 'ordersFiltered/' + UserId + '/' + Status);
  }
}
