import { TestBed } from '@angular/core/testing';

import { ApodServiceService } from './apod-service.service';

describe('ApodServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApodServiceService = TestBed.get(ApodServiceService);
    expect(service).toBeTruthy();
  });
});
