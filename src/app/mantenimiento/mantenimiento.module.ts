import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { ArticuloComponent } from './articulo/articulo.component';
import { IngresoLotComponent } from './ingreso-lot/ingreso-lot.component';
import { DetalleArtEntradaComponent } from './detalle-art-entrada/detalle-art-entrada.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { DetalleArtSalidaComponent } from './detalle-art-salida/detalle-art-salida.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SalidaComponent } from './salida/salida.component';
import { UsuarioComponent } from './usuario/usuario.component';

//Importaciones de NG ZORRO
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  declarations: [
    ArticuloComponent,
    IngresoLotComponent,
    DetalleArtEntradaComponent,
    MovimientoComponent,
    DetalleArtSalidaComponent,
    CategoriaComponent,
    SalidaComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzModalModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MantenimientoModule { }
