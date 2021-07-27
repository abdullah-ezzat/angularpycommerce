import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compactDecrypt } from 'jose/jwe/compact/decrypt';
import { parseJwk } from 'jose/jwk/parse';
const jose = require('node-jose');
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  // 'http://pycommerceapp.herokuapp.com/api/get/';
  private get = 'http://127.0.0.1:8000/api/get/';

  constructor(private http: HttpClient) {}

  assignCategory(CategoryId) {
    return this.http.get(this.get + 'assignCategory/' + CategoryId);
  }

  checkProductExist(StoreId, ProductId) {
    return this.http.get(
      this.get + 'checkProduct/' + StoreId + '/' + ProductId
    );
  }

  async decryptData(token, key) {
    const decoder = new TextDecoder();
    const jwk = await parseJwk(key, 'RSA-OAEP');
    const { plaintext } = await compactDecrypt(token, jwk);
    return JSON.parse(decoder.decode(plaintext));
  }

  async encryptData(data) {
    var keystore = jose.JWK.createKeyStore();
    return keystore
      .generate('RSA', 2048, { alg: 'RSA-OAEP', enc: 'A256GCM' })
      .then((result) => {
        const rsa = result;
        var key = rsa.toJSON(true);
        return jose.JWE.createEncrypt({ format: 'compact' }, key)
          .update(data)
          .final()
          .then((result) => {
            return { token: result, key: key };
          });
      });
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
