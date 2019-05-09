import { TestBed } from '@angular/core/testing';

import { ServerService } from './server.service';

describe('ApodServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerService = TestBed.get(ServerService);
    expect(service).toBeTruthy();
  });
});
