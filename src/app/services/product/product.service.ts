import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Product } from './product.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiService,
    private storage: StorageService,
  ) { }

  fetchProducts(): Observable<Product[]> {
    const headers = new HttpHeaders();
    const token = this.storage.getToken();
    if (token) headers.append('Authorization', token);

    const options = { headers };
    
    return this.http.get<any>(this.apiUrl.getProductApiUrl(), options);
  }
}
