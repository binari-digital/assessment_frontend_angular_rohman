import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ApiService } from '../api.service';
import { StorageService } from '../storage/storage.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let storageService: StorageService;
  let router: Router;
  let api: ApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, ApiService, StorageService]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    api = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    spyOn(storageService, 'getToken').and.returnValue('exampleToken');
    expect(authService.isAuthenticated()).toBeTrue();
  });

  it('should return false if user is not authenticated', () => {
    spyOn(storageService, 'getToken').and.returnValue(null);
    expect(authService.isAuthenticated()).toBeFalse();
  });

  it('should navigate to login if user is not authenticated in canAccess method', () => {
    spyOn(storageService, 'getToken').and.returnValue(null);
    spyOn(router, 'navigate');
    authService.canAccess();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to home if user is authenticated in canAuthenticate method', () => {
    spyOn(storageService, 'getToken').and.returnValue('exampleToken');
    spyOn(router, 'navigate');
    authService.canAuthenticate();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should return message "Login successfully" if login is successful', (done) => {
    const mockUsers = [
      { email: 'test@example.com', password: 'password', token: 'exampleToken', name: 'Test User', avatar: 'avatar-url' }
    ];
    const email = 'test@example.com';
    const password = 'password';

    authService.login(email, password).subscribe((message) => {
      expect(message).toEqual('Login successfully');
      done();
    });

    const req = httpMock.expectOne(api.getUserApiUrl());
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should throw error if login is unsuccessful', (done) => {
    const mockUsers = [
      { email: 'test@example.com', password: 'password', token: 'exampleToken', name: 'Test User', avatar: 'avatar-url' }
    ];
    const email = 'test@example.com';
    const password = 'wrongPassword';

    authService.login(email, password).subscribe({
      error: (err) => {
        expect(err.message).toEqual('Invalid Email or Password');
        done();
      }
    });

    const req = httpMock.expectOne(api.getUserApiUrl());
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

});
