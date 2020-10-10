import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZarinpalComponent } from './zarinpal.component';

describe('ZarinpalComponent', () => {
  let component: ZarinpalComponent;
  let fixture: ComponentFixture<ZarinpalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZarinpalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZarinpalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
