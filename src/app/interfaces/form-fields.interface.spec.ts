import { TestBed } from '@angular/core/testing';

import { IFormFields } from './form-fields.interface';

describe('IFormFields', () => {
  let service: IFormFields;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IFormFields);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
