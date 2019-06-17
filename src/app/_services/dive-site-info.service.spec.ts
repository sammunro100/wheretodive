import { TestBed } from '@angular/core/testing';

import { DiveSiteInfoService } from './dive-site-info.service';

describe('DiveSiteInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiveSiteInfoService = TestBed.get(DiveSiteInfoService);
    expect(service).toBeTruthy();
  });
});
