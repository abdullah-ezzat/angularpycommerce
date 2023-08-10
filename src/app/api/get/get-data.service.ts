import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compactDecrypt } from 'jose/jwe/compact/decrypt';
import { parseJwk } from 'jose/jwk/parse';
import * as SJCL from 'sjcl';
const jose = require('node-jose');
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  // 'http://127.0.0.1:8000';
  private get = 'http://127.0.0.1:8000/api/get';

  constructor(private http: HttpClient) {}

  async decryptData(token, key, type = 'AES', dumped = true) {
    if (type == 'AES') {
      var data = SJCL.decrypt(key, JSON.stringify(token));
      return JSON.parse(data);
    } else {
      const jwk = await parseJwk(key, 'RSA-OAEP');
      const { plaintext } = await compactDecrypt(token, jwk);
      const decoder = new TextDecoder();
      if (dumped == true) {
        var result = JSON.parse(decoder.decode(plaintext));
      } else {
        result = decoder.decode(plaintext);
      }
      return result;
    }
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

  assignCategory(CategoryId) {
    return this.http.get(`${this.get}/assignCategory/${CategoryId}`);
  }

  checkProductExist(StoreId, ProductId) {
    return this.http.get(`${this.get}/checkProduct/${StoreId}/${ProductId}`);
  }
  checkProductQuantity(StoreId, ProductId) {
    return this.http.get(
      `${this.get}/checkProductQuantity/${StoreId}/${ProductId}`
    );
  }
  loginAsGuest() {
    return this.http.get(`${this.get}/loginAsGuest`);
  }
  getCartItem(ProductId) {
    return this.http.get(`${this.get}/cartItem/${ProductId}`);
  }
  async getCartTotal(CartId) {
    const data = await this.http
      .get(`${this.get}/cartTotal/${CartId}`)
      .toPromise();
    return data;
  }
  getData(fn, id) {
    return this.http.get(`${this.get}/${fn}/${id}`);
  }
  getOrders(UserId) {
    return this.http.get(`${this.get}/orders/${UserId}`);
  }

  getOrdersMaster(UserId) {
    return this.http.get(`${this.get}/ordersMaster/${UserId}`);
  }

  getOrdersShipping(UserId) {
    return this.http.get(`${this.get}/ordersShipping/${UserId}`);
  }

  getProductRating(ProductId) {
    return this.http.get(`${this.get}/productRate/${ProductId}`);
  }
  getShippingDetails(UserId) {
    return this.http.get(`${this.get}/shippingDetails/${UserId}`);
  }
  getUser(UserId) {
    return this.http.get(`${this.get}/user/${UserId}`);
  }
}
