import { Component, OnInit } from '@angular/core';
import { Salida } from 'src/app/api/models';
import { SalidaControllerService} from 'src/app/api/services';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent  implements OnInit {


  salida: Salida[]=[];
  visible: boolean = false;

  constructor(
    private salidaService: SalidaControllerService,
    private messageService:NzMessageService,
    private fb:  FormBuilder

  ){}

  formSalida: FormGroup=this.fb.group({
    id:[],
    autorizacion: [],
    valor_t: [],
    fecha_s:[],
    cant_t:[],

  })

  ngOnInit():void{
    this.salidaService.find().subscribe(data=>this.salida=data)
  }
  
  mostrar(data?:Salida):void{
    if(data?.id){
      this.formSalida.setValue(data)
    }
    this.visible=true
  }
  eliminar(id:string):void{
    this.salidaService.deleteById({id}).subscribe(()=>{
      this.salida=this.salida.filter(x => x.id !== id);
      this.messageService.success('Registro Eliminado')
    })
  
    
  }
  guardar():void{
      if (this.formSalida.value.id) {
        this.salidaService.updateById({ 'id': this.formSalida.value.id, 'body': this.formSalida.value }).subscribe(
          () => {
            this.salida = this.salida.map(obj => {
              if (obj.id === this.formSalida.value.id){
                return this.formSalida.value;
              }
              return obj;
            })
            this.messageService.success('Registro actualizado con exito!')
            this.formSalida.reset()
          }
        )
      } else {
        delete this.formSalida.value.id
        this.salidaService.create({ body: this.formSalida.value }).subscribe((datoAgregado) => {
          this.salida = [...this.salida, datoAgregado]
          this.messageService.success('Registro creado con exito!')
          this.formSalida.reset()
        })
      }
      this.visible = false
    }
  
  
  ocultar(){
    this.visible=false
    this.formSalida.reset()
  }
  cancel(){
    this.messageService.info('Su registro sigue activo!')
  }
  
  
  }
  
