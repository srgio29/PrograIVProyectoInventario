import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticuloComponent } from './articulo/articulo.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { DetalleArtEntradaComponent } from './detalle-art-entrada/detalle-art-entrada.component';
import { DetalleArtSalidaComponent } from './detalle-art-salida/detalle-art-salida.component';
import { IngresoLotComponent } from './ingreso-lot/ingreso-lot.component';
import { MovimientoComponent } from './movimiento/movimiento.component';
import { SalidaComponent } from './salida/salida.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path: 'articulo', component:ArticuloComponent},
      {path: 'ingresolot', component:IngresoLotComponent},
      {path: 'detalleartentrada', component:DetalleArtEntradaComponent},
      {path: 'movimiento', component:MovimientoComponent},
      {path: 'detalleartsalida', component:DetalleArtSalidaComponent},
      {path: 'categoria', component:CategoriaComponent},
      {path: 'salida ', component:SalidaComponent},
      {path: 'usuario', component:UsuarioComponent}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
