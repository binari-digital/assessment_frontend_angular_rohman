import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'canAuthenticate', 'canAccess']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getToken', 'signOut']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call canAuthenticate if token exists on initialization', () => {
    storageService.getToken.and.returnValue('exampleToken');
    component.ngOnInit();
    expect(authService.canAuthenticate).toHaveBeenCalled();
  });

  it('should call canAccess if token does not exist on initialization', () => {
    storageService.getToken.and.returnValue(null);
    component.ngOnInit();
    expect(authService.canAccess).toHaveBeenCalled();
  });

  it('should set loading to true and call authService login on login()', async () => {
    const loginResponse = 'Login successfully';
    authService.login.and.returnValue(of(loginResponse));
    component.formdata.email = 'test@example.com';
    component.formdata.password = 'password';
    const loginPromise = component.login();
    await loginPromise;
    expect(component.loading).toBeFalse();
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
  });
  

  it('should set loading to false, message and isError on successful login', () => {
    const loginResponse = 'Login successfully';
    authService.login.and.returnValue(of(loginResponse));
    component.login();
    expect(component.loading).toBeFalse();
    expect(component.message).toEqual(loginResponse);
    expect(component.isError).toBeFalse();
  });

  it('should set loading to false, message and isError on failed login', () => {
    const errorMessage = { message: 'Invalid Email or Password' };
    authService.login.and.returnValue(throwError(errorMessage));
    component.login();
    expect(component.loading).toBeFalse();
    expect(component.message).toEqual(errorMessage.message);
    expect(component.isError).toBeTrue();
  });

  it('should call storage signOut on logout()', () => {
    component.logout();
    expect(storageService.signOut).toHaveBeenCalled();
  });
});
