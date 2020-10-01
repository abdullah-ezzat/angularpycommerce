import { TestBed } from '@angular/core/testing';

import { GetDataApiService } from './get-data-api.service';

describe('GetDataApiService', () => {
  let service: GetDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
