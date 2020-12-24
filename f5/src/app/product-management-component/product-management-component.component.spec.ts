import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementComponentComponent } from './product-management-component.component';

describe('ProductManagementComponentComponent', () => {
  let component: ProductManagementComponentComponent;
  let fixture: ComponentFixture<ProductManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
