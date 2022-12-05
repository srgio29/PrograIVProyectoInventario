import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IngresoLote } from 'src/app/api/models';
import { IngresoLoteControllerService } from 'src/app/api/services';


@Component({
  selector: 'app-ingreso-lot',
  templateUrl: './ingreso-lot.component.html',
  styleUrls: ['./ingreso-lot.component.css']
})
export class IngresoLotComponent implements OnInit {

  IngresoLote: IngresoLote[]=[];
  visible:boolean=false;

  constructor(
    private ingresoLoteService: IngresoLoteControllerService,
    private messageService:NzMessageService,
    private fb:FormBuilder
  ) {}

    formIngresoLote: FormGroup = this.fb.group
    ({
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

  ngOnInit(): void {
    this.ingresoLoteService.find().subscribe(data=>this.IngresoLote=data)
    
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
    this.visible=false
  }

  mostrar(data?:IngresoLote):void{
    this.visible=true
  }

  guardar():void{
   
  }
}
