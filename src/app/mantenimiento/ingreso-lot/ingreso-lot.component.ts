import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IngresoLote, Articulo } from 'src/app/api/models';
import { ArticuloControllerService, IngresoLoteControllerService } from 'src/app/api/services';


@Component({
  selector: 'app-ingreso-lot',
  templateUrl: './ingreso-lot.component.html',
  styleUrls: ['./ingreso-lot.component.css']
})
export class IngresoLotComponent implements OnInit {

  IngresoLote: IngresoLote[]=[];
  articulo: Articulo[]=[];
  visible:boolean=false;

  constructor(
    private ingresoLoteService: IngresoLoteControllerService,
    private articuloService: ArticuloControllerService,
    private messageService:NzMessageService,
    private fb:FormBuilder,
    private fbi:FormBuilder
  ) {}

    formIngresoLote: FormGroup = this.fb.group({
      id:[],
      fechaIngreso:[],
      descripcionLote:[],
      idArticulo:[],
      codigoArticulo:[],
      cantidadArticulo:[],
      descripcionArticulo:[],
      costoArticulo:[],
      codigoGestionLote:[],
      idUsuario:[]
    })

    formArticulo: FormGroup = this.fbi.group({
      cant_art: [],
      color:[],
      costo:[],
      descripcion:[],
      detArtEntradaId:[],
      id:[],
      detalleArtSalidaId:[],
      id_art:[],
      ingresoLoteId:[],
      material:[],
    })


  ngOnInit(): void {
    this.ingresoLoteService.find().subscribe(data=>this.IngresoLote=data)
    this.articuloService.find().subscribe(data => this.articulo = data)
  }

  eliminar(id:string):void{
    this.ingresoLoteService.deleteById({id}).subscribe(()=>
    {
      this.IngresoLote=this.IngresoLote.filter(x => x.id !== id);
      this.messageService.info('El registro ha sido eliminado!')
    })  
  }

  cancel(id?:string):void{
    this.messageService.info('El registro seguira disponible y activo!')
    
  }

  ocultar():void{
    this.visible = false
    this.formIngresoLote.reset()
  }

  mostrar(data?:IngresoLote):void{
    if (data?.id) {
      this.formIngresoLote.setValue({ ...data, 'disponible': String(data.id) })
    }
    this.visible = true
  }


  mostrarArticulo(data?:IngresoLote):void{
    if (data?.id) {
      this.formArticulo.setValue({ ...data, 'disponible': String(data.id) })
    }
    this.visible = true
  }

  guardar():void{
    this.formIngresoLote.setValue({ ...this.formIngresoLote.value, 'disponible': Boolean(this.formIngresoLote.value.disponible) })
    if (this.formIngresoLote.value.id) {
      this.ingresoLoteService.updateById({ 'id': this.formIngresoLote.value.id, 'body': this.formIngresoLote.value }).subscribe(
        () => {
          this.IngresoLote = this.IngresoLote.map(obj => {
            if (obj.id === this.formIngresoLote.value.id){
              return this.formIngresoLote.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado con exito!')
          this.formIngresoLote.reset()
        }
      )
    } else {
      delete this.formIngresoLote.value.id
      this.ingresoLoteService.create({ body: this.formIngresoLote.value }).subscribe((datoAgregado) => {
        this.IngresoLote = [...this.IngresoLote, datoAgregado]
        this.messageService.success('Registro creado con exito!')
        this.formIngresoLote.reset()
      })
    }
    this.visible = false
  }

  guardarArticulo():void{
    this.formArticulo.setValue({ ...this.formArticulo.value, 'disponible': Boolean(this.formArticulo.value.disponible) })
    if (this.formArticulo.value.id) {
      this.articuloService.updateById({ 'id': this.formArticulo.value.id, 'body': this.formArticulo.value }).subscribe(
        () => {
          this.articulo = this.articulo.map(obj => {
            if (obj.id === this.formArticulo.value.id){
              return this.formArticulo.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado con exito!')
          this.formArticulo.reset()
        }
      )
    } else {
      delete this.formArticulo.value.id
      this.articuloService.create({ body: this.formArticulo.value }).subscribe((datoAgregado) => {
        this.articulo = [...this.articulo, datoAgregado]
        this.messageService.success('Registro creado con exito!')
        this.formArticulo.reset()
      })
    }
    this.visible = false
  }



}
