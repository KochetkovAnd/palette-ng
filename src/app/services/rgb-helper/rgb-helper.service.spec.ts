import { TestBed } from '@angular/core/testing';
import { RgbHelperService } from './rgb-helper.service';

describe('RgbHelperService', () => {
  let service: RgbHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RgbHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
