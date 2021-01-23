import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Wc2Component } from './wc2.component';

describe('Wc2Component', () => {
  let component: Wc2Component;
  let fixture: ComponentFixture<Wc2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Wc2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Wc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
