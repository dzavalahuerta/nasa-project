import { TestBed } from '@angular/core/testing';

import { UserAuthenticationService } from './userAuthentication.service';

describe('UserAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAuthenticationService = TestBed.get(UserAuthenticationService);
    expect(service).toBeTruthy();
  });
});
