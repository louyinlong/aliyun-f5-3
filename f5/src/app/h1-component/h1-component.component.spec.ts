import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H1ComponentComponent } from './h1-component.component';

describe('H1ComponentComponent', () => {
  let component: H1ComponentComponent;
  let fixture: ComponentFixture<H1ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H1ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H1ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
