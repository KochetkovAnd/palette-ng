import { TestBed } from '@angular/core/testing';

import { WheelColorsService } from './wheel-colors.service';

describe('WheelColorsService', () => {
  let service: WheelColorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheelColorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
