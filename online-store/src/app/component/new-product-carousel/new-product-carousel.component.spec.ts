import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductCarouselComponent } from './new-product-carousel.component';

describe('NewProductCarouselComponent', () => {
  let component: NewProductCarouselComponent;
  let fixture: ComponentFixture<NewProductCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
