import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselForthComponent } from './carousel-forth.component';

describe('CarouselForthComponent', () => {
  let component: CarouselForthComponent;
  let fixture: ComponentFixture<CarouselForthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselForthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselForthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
