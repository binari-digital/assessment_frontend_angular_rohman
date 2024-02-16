import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth } from './auth.model';
import { ApiService } from '../api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiUrl: ApiService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  
  private getUsers(): Observable<Auth[]> {
    return this.http.get<any>(this.apiUrl.getUserApiUrl());
  }

  isAuthenticated():boolean{
    if (this.storage.getToken() !== null) {
        return true;
    }
    return false;
  }

  canAccess(){
    if (!this.isAuthenticated()) {
        this.router.navigate(['/login']);
    }
  }
  canAuthenticate(){
    if (this.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login(email: string, password: string): Observable<string> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(({ email: resEmail }) => email === resEmail);
  
        if (user && user.password === password) {
          const { token, avatar, email, name } = user;
          this.storage.saveUser({ avatar, email, name });
          this.storage.saveToken(token);
          return 'Login successfully';
        } else {
          throw new Error('Invalid Email or Password');
        }
      }),
      catchError((error) => {
        throw new Error(error.message);
      })
    );
  }
}
