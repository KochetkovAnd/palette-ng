import { TestBed } from '@angular/core/testing';

import { StyleChangerService } from './style-changer.service';

describe('StyleChangerService', () => {
  let service: StyleChangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleChangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
