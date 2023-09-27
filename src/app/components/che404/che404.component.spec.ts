import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Che404Component } from './che404.component';

describe('Che404Component', () => {
  let component: Che404Component;
  let fixture: ComponentFixture<Che404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Che404Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Che404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
