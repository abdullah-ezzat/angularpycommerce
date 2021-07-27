import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddDataService {
  // http://pycommerceapp.herokuapp.com //
  private add = 'http://127.0.0.1:8000/api/add/';

  constructor(private http: HttpClient) {}

  addData(model, post: any) {
    return this.http.post(this.add + model, post);
  }

  addCartItem(post: any) {
    return this.http.post(this.add + 'cartItem', post);
  }

  addOrder(cartId, userId) {
    return this.http.post(this.add + 'order/' + cartId + '/' + userId, null);
  }

  addNotes(post: any, OrderId, UserId) {
    return this.http.post(this.add + 'notes/' + OrderId + '/' + UserId, post);
  }

  copyProductSpec(ProductSpecId, ProductId, CategoryId) {
    return this.http.post(
      this.add +
        'copyProSpec/' +
        ProductSpecId +
        '/' +
        ProductId +
        '/' +
        CategoryId,
      null
    );
  }

  deliverOrder(OrderId, UserId) {
    return this.http.post(
      this.add + 'deliverOrder/' + OrderId + '/' + UserId,
      null
    );
  }

  async addShoppingCartMaster() {
    const data = await this.http
      .get(this.add + 'shoppingCartMaster')
      .toPromise();
    return data;
  }

  updateCartQuantity(cartId, Quantity) {
    return this.http.post(
      this.add + 'updateQuantity/' + cartId + '/' + Quantity,
      null
    );
  }

  rateProduct(post: any) {
    return this.http.post(this.add + 'rateProduct', post);
  }

  updateData(model, id, post: any) {
    return this.http.post(this.add + model + '/' + id, post);
  }

  updateTimestamp() {
    var LoginDate = new Date();
    var LoginDateStamp = LoginDate.getTime();
    return LoginDateStamp;
  }

  deleteCartItem(id) {
    return this.http.delete(this.add + 'deleteItem/' + id);
  }

  deleteCart(cartId) {
    return this.http.delete(this.add + 'deleteCart/' + cartId);
  }

  authUser(post: any) {
    return this.http.post(this.add + 'authUser', post);
  }

  registerUser(post: any) {
    return this.http.post(this.add + 'registerUser', post);
  }

  updateUser(id, post: any) {
    return this.http.post(this.add + 'updateUser/' + id, post);
  }
}
