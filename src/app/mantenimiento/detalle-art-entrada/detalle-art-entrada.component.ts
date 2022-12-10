import { Component, OnInit } from '@angular/core';
import { DetArtEntrada } from 'src/app/api/models';
import { DetalleArtEntradaControllerService } from 'src/app/api/services';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalle-art-entrada',
  templateUrl: './detalle-art-entrada.component.html',
  styleUrls: ['./detalle-art-entrada.component.css']
})
export class DetalleArtEntradaComponent implements OnInit{

  DetArtEntrada: DetArtEntrada[]=[];
  visible: boolean = false;

  constructor(
    private DetArtEntradaService: DetalleArtEntradaControllerService,
    private messageService:NzMessageService,
    private fb:  FormBuilder

    ){}

    formDetalleArtEntrada: FormGroup=this.fb.group({
      idarticulo:[],
      idlote: [],
      cantidadarticulo: [],
      costounitario:[]

    })


ngOnInit():void{
  this.DetArtEntradaService.find()
}

mostrar(data?:DetArtEntrada):void{
  if(data?.id){
    this.formDetalleArtEntrada.setValue(data)
  }
  this.visible=true
}
eliminar(id:string):void{
  this.DetArtEntradaService.deleteById({id}).subscribe(()=>{
    this.DetArtEntrada=this.DetArtEntrada.filter(x => x.id !== id);
    this.messageService.success('Registro Eliminado')
  })

  
}
guardar():void{
    if (this.formDetalleArtEntrada.value.id) {
      this.DetArtEntradaService.updateById({ 'id': this.formDetalleArtEntrada.value.id, 'body': this.formDetalleArtEntrada.value }).subscribe(
        () => {
          this.DetArtEntrada = this.DetArtEntrada.map(obj => {
            if (obj.id === this.formDetalleArtEntrada.value.id){
              return this.formDetalleArtEntrada.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado con exito!')
          this.formDetalleArtEntrada.reset()
        }
      )
    } else {
      delete this.formDetalleArtEntrada.value.id
      this.DetArtEntradaService.create({ body: this.formDetalleArtEntrada.value }).subscribe((datoAgregado) => {
        this.DetArtEntrada = [...this.DetArtEntrada, datoAgregado]
        this.messageService.success('Registro creado con exito!')
        this.formDetalleArtEntrada.reset()
      })
    }
    this.visible = false
  }


ocultar(){
  this.visible=false
  this.formDetalleArtEntrada.reset()
}
cancel(){
  this.messageService.info('Su registro sigue activo!')
}


}
