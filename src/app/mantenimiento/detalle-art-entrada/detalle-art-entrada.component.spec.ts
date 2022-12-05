import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArtEntradaComponent } from './detalle-art-entrada.component';

describe('DetalleArtEntradaComponent', () => {
  let component: DetalleArtEntradaComponent;
  let fixture: ComponentFixture<DetalleArtEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleArtEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArtEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
