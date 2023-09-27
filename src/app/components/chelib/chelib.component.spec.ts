import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChelibComponent } from './chelib.component';

describe('ChelibComponent', () => {
  let component: ChelibComponent;
  let fixture: ComponentFixture<ChelibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChelibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChelibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
