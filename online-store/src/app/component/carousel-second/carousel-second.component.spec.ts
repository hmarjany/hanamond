import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSecondComponent } from './carousel-second.component';

describe('CarouselSecondComponent', () => {
  let component: CarouselSecondComponent;
  let fixture: ComponentFixture<CarouselSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
