import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['canAccess']);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getUser', 'signOut']);

    await TestBed.configureTestingModule({
      declarations: [TopbarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on initialization', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', avatar: 'avatar-url' };
    storageService.getUser.and.returnValue(mockUser);
    component.ngOnInit();
    expect(component.name).toEqual(mockUser.name);
    expect(component.email).toEqual(mockUser.email);
    expect(component.avatar).toEqual(mockUser.avatar);
  });

  it('should call storage service signOut and authService canAccess on logout', () => {
    component.logout();
    expect(storageService.signOut).toHaveBeenCalled();
    expect(authService.canAccess).toHaveBeenCalled();
  });

  it('should set showFallback to true on fallbackImage', () => {
    component.fallbackImage();
    expect(component.showFallback).toBeTrue();
  });
});
