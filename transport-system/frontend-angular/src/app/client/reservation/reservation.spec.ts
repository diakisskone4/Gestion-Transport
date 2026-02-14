import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservation } from './reservations.component';

describe('Reservation', () => {
  let component: Reservation;
  let fixture: ComponentFixture<Reservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reservation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
