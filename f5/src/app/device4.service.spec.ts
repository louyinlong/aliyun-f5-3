import { TestBed } from '@angular/core/testing';

import { Device4Service } from './device4.service';

describe('Device4Service', () => {
  let service: Device4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Device4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
