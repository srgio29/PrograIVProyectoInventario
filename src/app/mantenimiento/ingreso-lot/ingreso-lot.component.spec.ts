import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoLotComponent } from './ingreso-lot.component';

describe('IngresoLotComponent', () => {
  let component: IngresoLotComponent;
  let fixture: ComponentFixture<IngresoLotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoLotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
