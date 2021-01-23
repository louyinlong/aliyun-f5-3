import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetail2ComponentComponent } from './product-detail2-component.component';

describe('ProductDetail2ComponentComponent', () => {
  let component: ProductDetail2ComponentComponent;
  let fixture: ComponentFixture<ProductDetail2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetail2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetail2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
