import { TestBed } from '@angular/core/testing';

import { MerchantauthGuard } from './merchantauth.guard';

describe('MerchantauthGuard', () => {
  let guard: MerchantauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MerchantauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
