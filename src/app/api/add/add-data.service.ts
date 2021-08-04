import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddDataService {
  // http://127.0.0.1:8000
  private add = 'http://127.0.0.1:8000/api/add';

  constructor(private http: HttpClient) {}

  addCartItem(post: any) {
    return this.http.post(`${this.add}/cartItem`, post);
  }
  addCategory(post: any) {
    return this.http.post(`${this.add}/addCategory`, post);
  }
  addData(model, post: any) {
    return this.http.post(`${this.add}/${model}`, post);
  }
  addInventory(post: any) {
    return this.http.post(`${this.add}/addInventory`, post);
  }
  addOrder(cartId, userId) {
    return this.http.post(`${this.add}/order/${cartId}/${userId}`, null);
  }
  addProduct(post: any) {
    return this.http.post(`${this.add}/addProduct`, post);
  }
  addNotes(post: any, OrderId, UserId) {
    return this.http.post(`${this.add}/notes/${OrderId}/${UserId}`, post);
  }
  async addShoppingCartMaster() {
    const data = await this.http
      .get(`${this.add}/shoppingCartMaster`)
      .toPromise();
    return data;
  }
  copyProductSpec(ProductSpecId, ProductId, CategoryId) {
    return this.http.post(
      `${this.add}/copyProSpec/${ProductSpecId}/${ProductId}/${CategoryId}`,
      null
    );
  }
  deliverOrder(OrderId, UserId) {
    return this.http.post(
      `${this.add}/deliverOrder/${OrderId}/${UserId}`,
      null
    );
  }
  rateProduct(post: any) {
    return this.http.post(`${this.add}/rateProduct`, post);
  }
  updateCartQuantity(cartId, Quantity) {
    return this.http.post(
      `${this.add}/updateQuantity/${cartId}/${Quantity}`,
      null
    );
  }
  updateData(model, id, post: any) {
    return this.http.post(`${this.add}/${model}/${id}`, post);
  }
  updateInvDetail(id, post: any) {
    return this.http.post(`${this.add}/updateInvDetail/${id}`, post);
  }
  updateProduct(id, post: any) {
    return this.http.post(`${this.add}/updateProduct/${id}`, post);
  }
  updateTimestamp() {
    var LoginDate = new Date();
    var LoginDateStamp = LoginDate.getTime();
    return LoginDateStamp;
  }
  authUser(post: any) {
    return this.http.post(`${this.add}/authUser`, post);
  }

  registerUser(post: any) {
    return this.http.post(`${this.add}/registerUser`, post);
  }

  updateCategory(id, post: any) {
    return this.http.post(`${this.add}/updateCategory/${id}`, post);
  }
  updateUser(id, post: any) {
    return this.http.post(`${this.add}/updateUser/${id}`, post);
  }
  updateImages(id, post: any) {
    return this.http.post(`${this.add}/updateImages/${id}`, post);
  }
  deleteCartItem(id) {
    return this.http.delete(`${this.add}/deleteItem/${id}`);
  }
  deleteCart(cartId) {
    return this.http.delete(`${this.add}/deleteCart/${cartId}`);
  }
}
