import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { H3ComponentComponent } from './h3-component.component';

describe('H3ComponentComponent', () => {
  let component: H3ComponentComponent;
  let fixture: ComponentFixture<H3ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H3ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H3ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
