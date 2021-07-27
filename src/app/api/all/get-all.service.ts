import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { compactDecrypt } from 'jose/jwe/compact/decrypt';
import { parseJwk } from 'jose/jwk/parse';
const jose = require('node-jose');
@Injectable({
  providedIn: 'root',
})
export class GetAllService {
  // Public Url: 'https://pycommerceapp.herokuapp.com/api/all/' \\

  private all = 'http://pycommerceapp.herokuapp.com/api/all/';

  constructor(private http: HttpClient) {}

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

  getProSpec(ProductId) {
    return this.http.get(this.all + 'productSpec/' + ProductId);
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
