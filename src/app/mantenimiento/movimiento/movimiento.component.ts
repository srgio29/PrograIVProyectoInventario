import { Component, OnInit } from '@angular/core';
import {  Movimiento } from 'src/app/api/models';
import {  MovimientoControllerService } from 'src/app/api/services';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})

export class MovimientoComponent implements OnInit {

  movimiento: Movimiento[]=[];
  visible: boolean = false;


  constructor(
    private movimientoService: MovimientoControllerService,
    private messageService:NzMessageService,
    private fb:  FormBuilder

    ){}


    formMovimiento: FormGroup=this.fb.group({
      id:[],
      cantidad: [],
      id_art: [],
      id_lot:[]
    })

  ngOnInit(): void {
    this.movimientoService.find().subscribe(data=>this.movimiento=data)
  }
  mostrar(data?:Movimiento):void{
    if(data?.id){
      this.formMovimiento.setValue(data)
    }
    this.visible=true

  }

  eliminar(id:string):void{
    this.movimientoService.deleteById({id}).subscribe(()=>{
      this.movimiento=this.movimiento.filter(x => x.id !== id);
      this.messageService.success('Registro Eliminado')
    })

  }


  ocultar(){
    this.visible=false
    this.formMovimiento.reset()
  }
  cancel(){
    this.messageService.info('Su registro sigue activo!')
  }
  guardar():void{

    if (this.formMovimiento.value.id) {
      this.movimientoService.updateById({ 'id': this.formMovimiento.value.id, 'body': this.formMovimiento.value }).subscribe(
        () => {
          this.movimiento = this.movimiento.map(obj => {
            if (obj.id === this.formMovimiento.value.id){
              return this.formMovimiento.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado con exito!')
          this.formMovimiento.reset()
        }
      )
    } else {
      delete this.formMovimiento.value.id
      this.movimientoService.create({ body: this.formMovimiento.value }).subscribe((datoAgregado) => {
        this.movimiento = [...this.movimiento, datoAgregado]
        this.messageService.success('Registro creado con exito!')
        this.formMovimiento.reset()
      })
    }
    this.visible = false
  }

  }