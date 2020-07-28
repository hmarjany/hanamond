import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselFirstComponent } from './carousel-first.component';

describe('CarouselFirstComponent', () => {
  let component: CarouselFirstComponent;
  let fixture: ComponentFixture<CarouselFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
