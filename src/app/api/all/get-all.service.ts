import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compactDecrypt } from 'jose/jwe/compact/decrypt';
import { parseJwk } from 'jose/jwk/parse';
import * as SJCL from 'sjcl';
const jose = require('node-jose');
@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  // Public Url: 'https://127.0.0.1:8000/' \\

  private all = 'http://pycommerceapp.herokuapp.com/api/all';

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

  getAllCategories() {
    return this.http.get(`${this.all}/mainCategories`);
  }
  getAllCart(CartId) {
    return this.http.get(`${this.all}/cart/${CartId}`);
  }
  getAllData(fn) {
    return this.http.get(`${this.all}/${fn}`);
  }
  getAllReviews(ProductId) {
    return this.http.get(`${this.all}/reviews/${ProductId}`);
  }

  getAllSpecifications(CategoryId) {
    return this.http.get(`${this.all}/spec/${CategoryId}`);
  }

  getHomeProducts(page, selectedValues, search, categoryId) {
    return this.http.get(
      `${this.all}/getHomeProducts/page=${page}/specValue=${selectedValues}/search=${search}/category=${categoryId}`
    );
  }
  getOrdersFilterd(UserId, Status) {
    return this.http.get(`${this.all}/ordersFiltered/${UserId}/${Status}`);
  }

  getProductsPage(page, search) {
    return this.http.get(`${this.all}/getProductsPage/${page}/${search}`);
  }

  getProductNames(search) {
    return this.http.get(`${this.all}/productNames/${search}`);
  }

  getProSpecInv(ProductId) {
    return this.http.get(`${this.all}/proSpecInv/${ProductId}`);
  }

  getProSpec(ProductId) {
    return this.http.get(`${this.all}/productSpec/${ProductId}`);
  }
  getMaxPage(selectedValues, search, categoryId) {
    return this.http.get(
      `${this.all}/getMaxPage/specValue=${selectedValues}/search=${search}/category=${categoryId}`
    );
  }
  getSubCategories() {
    return this.http.get(`${this.all}/subCategories`);
  }
}
