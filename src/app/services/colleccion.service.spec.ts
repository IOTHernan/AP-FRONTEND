import { TestBed } from '@angular/core/testing';

import { ColleccionService } from './colleccion.service';

describe('ColleccionService', () => {
  let service: ColleccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColleccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
