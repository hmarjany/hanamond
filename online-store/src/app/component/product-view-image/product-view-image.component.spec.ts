import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewImageComponent } from './product-view-image.component';

describe('ProductViewImageComponent', () => {
  let component: ProductViewImageComponent;
  let fixture: ComponentFixture<ProductViewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
