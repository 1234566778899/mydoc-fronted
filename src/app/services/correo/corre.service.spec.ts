import { TestBed } from '@angular/core/testing';

import { CorreService } from './corre.service';

describe('CorreService', () => {
  let service: CorreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
