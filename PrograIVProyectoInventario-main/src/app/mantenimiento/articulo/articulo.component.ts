import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Articulo } from 'src/app/api/models';
import { ArticuloControllerService} from 'src/app/api/services';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent {


  articulo: Articulo[]=[];
  visible:boolean=false;

  constructor(
    private articuloService: ArticuloControllerService,
    private messageService:NzMessageService,
    private fbi:FormBuilder
  ) {}

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
    this.articuloService.find().subscribe(data => this.articulo = data)
  }

  eliminar(id:string):void{
    this.articuloService.deleteById({id}).subscribe(()=>
    {
      this.articulo=this.articulo.filter(x => x.id !== id);
      this.messageService.info('El registro ha sido eliminado!')
    })  
  }

  cancel(id?:string):void{
    this.messageService.info('El registro seguira disponible y activo!')
    
  }

  ocultar():void{
    this.visible = false
    this.formArticulo.reset()
  }


  mostrarArticulo(data?:Articulo):void{
    if (data?.id) {
      this.formArticulo.setValue(data)
    }
    this.visible = true
  }

  guardarArticulo():void{
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


