import { TestBed } from '@angular/core/testing';

import { CheMediaService } from './che-media.service';

describe('CheMediaService', () => {
  let service: CheMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
