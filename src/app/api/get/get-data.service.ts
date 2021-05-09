import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  private get = 'http://127.0.0.1:8000/api/get/';

  constructor(private http: HttpClient) {}

  getProductNames(search) {
    return this.http.get(this.get + 'productNames/' + search);
  }
}
