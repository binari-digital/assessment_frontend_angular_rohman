import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseApiUrl = 'https://6147e05c65467e0017384c29.mockapi.io/api';

  constructor() { }

  getUserApiUrl(): string {
    return `${this.baseApiUrl}/users`;
  }

  getProductApiUrl(): string {
    return `${this.baseApiUrl}/products`;
  }
}
