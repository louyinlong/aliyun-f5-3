import { TestBed } from '@angular/core/testing';

import { Device5Service } from './device5.service';

describe('DeviceService', () => {
  let service: Device5Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Device5Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
