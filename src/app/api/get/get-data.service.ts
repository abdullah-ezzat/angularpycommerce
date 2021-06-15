import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  // 'http://pycommerceapp.herokuapp.com/api/get/';
  private get = 'http://pycommerceapp.herokuapp.com/api/get/';

  constructor(private http: HttpClient) {}

  assignCategory(CategoryId) {
    return this.http.get(this.get + 'assignCategory/' + CategoryId);
  }

  checkProductExist(StoreId, ProductId) {
    return this.http.get(
      this.get + 'checkProduct/' + StoreId + '/' + ProductId
    );
  }

  getData(fn, id) {
    return this.http.get(this.get + fn + '/' + id);
  }

  getCartItem(ProductId) {
    return this.http.get(this.get + 'cartItem/' + ProductId);
  }

  async getCartTotal(CartId) {
    const data = await this.http
      .get(this.get + 'cartTotal/' + CartId)
      .toPromise();
    return data;
  }

  getProductRating(ProductId) {
    return this.http.get(this.get + 'productRate/' + ProductId);
  }

  getUser(UserId) {
    return this.http.get(this.get + 'user/' + UserId);
  }

  getOrders(UserId) {
    return this.http.get(this.get + 'orders/' + UserId);
  }

  getOrdersMaster(UserId) {
    return this.http.get(this.get + 'ordersMaster/' + UserId);
  }

  getOrdersShipping(UserId) {
    return this.http.get(this.get + 'ordersShipping/' + UserId);
  }

  getShippingDetails(UserId) {
    return this.http.get(this.get + 'shippingDetails/' + UserId);
  }

  loginAsGuest() {
    return this.http.get(this.get + 'loginAsGuest');
  }
}
