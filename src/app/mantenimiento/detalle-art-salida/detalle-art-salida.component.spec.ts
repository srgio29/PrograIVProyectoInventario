import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleArtSalidaComponent } from './detalle-art-salida.component';

describe('DetalleArtSalidaComponent', () => {
  let component: DetalleArtSalidaComponent;
  let fixture: ComponentFixture<DetalleArtSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleArtSalidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleArtSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
