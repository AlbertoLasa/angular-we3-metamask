import { TestBed } from '@angular/core/testing';

import { AuthWeb3Service } from './auth-web3.service';

describe('AuthWeb3Service', () => {
  let service: AuthWeb3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthWeb3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
