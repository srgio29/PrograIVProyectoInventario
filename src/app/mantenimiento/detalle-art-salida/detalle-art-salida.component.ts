import { Component, OnInit } from '@angular/core';
import { DetalleArtSalida } from 'src/app/api/models';
import { DetArtSalidaControllerService } from 'src/app/api/services';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle-art-salida',
  templateUrl: './detalle-art-salida.component.html',
  styleUrls: ['./detalle-art-salida.component.css']
})
export class DetalleArtSalidaComponent implements OnInit{

  DetArtSalida: DetalleArtSalida[]=[];
  visible: boolean = false;

  constructor(
    private DetArtSalidaService: DetArtSalidaControllerService,
    private messageService:NzMessageService,
    private fb:  FormBuilder

    ){}

    formDetalleArtSalida: FormGroup=this.fb.group({
      autorizacion:[],
      cantidad:[],
      id:[],
      id_art:[],
      precioV:[]

    })


ngOnInit():void{
  this.DetArtSalidaService.find()
}

mostrar(data?:DetalleArtSalida):void{
  if(data?.id){
    this.formDetalleArtSalida.setValue(data)
  }
  this.visible=true
}
eliminar(id:string):void{
  this.DetArtSalidaService.deleteById({id}).subscribe(()=>{
    this.DetArtSalida=this.DetArtSalida.filter(x => x.id !== id);
    this.messageService.success('Registro Eliminado')
  })

  
}
guardar():void{
    if (this.formDetalleArtSalida.value.id) {
      this.DetArtSalidaService.updateById({ 'id': this.formDetalleArtSalida.value.id, 'body': this.formDetalleArtSalida.value }).subscribe(
        () => {
          this.DetArtSalida = this.DetArtSalida.map(obj => {
            if (obj.id === this.formDetalleArtSalida.value.id){
              return this.formDetalleArtSalida.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado con exito!')
          this.formDetalleArtSalida.reset()
        }
      )
    } else {
      delete this.formDetalleArtSalida.value.id
      this.DetArtSalidaService.create({ body: this.formDetalleArtSalida.value }).subscribe((datoAgregado) => {
        this.DetArtSalida = [...this.DetArtSalida, datoAgregado]
        this.messageService.success('Registro creado con exito!')
        this.formDetalleArtSalida.reset()
      })
    }
    this.visible = false
  }

 
ocultar(){
  this.visible=false
  this.formDetalleArtSalida.reset()
}
cancel(){
  this.messageService.info('Su registro sigue activo!')
}


}
