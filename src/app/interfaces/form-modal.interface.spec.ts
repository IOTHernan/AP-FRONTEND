import { TestBed } from '@angular/core/testing';

import { IFormModal } from './form-modal.interface';

describe('FormModalService', () => {
  let service: IFormModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IFormModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
