import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private get = 'https://pycommerceapp.herokuapp.com/api/get/';

  constructor(private http: HttpClient) {}

  getProductNames(search) {
    return this.http.get(this.get + 'productNames/' + search);
  }
}
