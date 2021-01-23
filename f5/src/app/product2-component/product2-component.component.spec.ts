import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Product2ComponentComponent } from './product2-component.component';

describe('Product2ComponentComponent', () => {
  let component: Product2ComponentComponent;
  let fixture: ComponentFixture<Product2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
