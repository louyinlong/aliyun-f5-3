import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AliProductManagementComponentComponent } from './ali-product-management-component.component';

describe('AliProductManagementComponentComponent', () => {
  let component: AliProductManagementComponentComponent;
  let fixture: ComponentFixture<AliProductManagementComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AliProductManagementComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AliProductManagementComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
