import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Management2ComponentComponent } from './management2-component.component';

describe('Management2ComponentComponent', () => {
  let component: Management2ComponentComponent;
  let fixture: ComponentFixture<Management2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Management2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Management2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
