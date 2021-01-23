import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H2ComponentComponent } from './h2-component.component';

describe('H2ComponentComponent', () => {
  let component: H2ComponentComponent;
  let fixture: ComponentFixture<H2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
