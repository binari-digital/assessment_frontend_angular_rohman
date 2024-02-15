import { TestBed  } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve token from sessionStorage', () => {
    const token = 'exampleToken';
    service.saveToken(token);
    expect(service.getToken()).toEqual(token);
  });

  it('should save and retrieve user from sessionStorage', () => {
    const user = { username: 'exampleUser' };
    service.saveUser(user);
    expect(service.getUser()).toEqual(user);
  });

  it('should clear sessionStorage on signOut', () => {
    service.signOut();
    expect(window.sessionStorage.length).toEqual(0);
  });
});
