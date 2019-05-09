import { TestBed } from '@angular/core/testing';

import { CrossComponentCommunicationService } from './cross-component-communication.service';

describe('CrossComponentCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrossComponentCommunicationService = TestBed.get(CrossComponentCommunicationService);
    expect(service).toBeTruthy();
  });
});
