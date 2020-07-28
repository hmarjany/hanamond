import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselThirdComponent } from './carousel-third.component';

describe('CarouselThirdComponent', () => {
  let component: CarouselThirdComponent;
  let fixture: ComponentFixture<CarouselThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
