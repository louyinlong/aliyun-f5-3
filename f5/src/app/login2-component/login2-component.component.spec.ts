import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login2ComponentComponent } from './login2-component.component';

describe('Login2ComponentComponent', () => {
  let component: Login2ComponentComponent;
  let fixture: ComponentFixture<Login2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
