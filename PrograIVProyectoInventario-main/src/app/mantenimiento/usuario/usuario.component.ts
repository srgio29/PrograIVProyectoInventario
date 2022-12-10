import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Usuario } from 'src/app/api/models';
import { UsuarioControllerService } from 'src/app/api/services';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit{

  usuario: Usuario[]=[];
  visible: boolean = false;

  constructor(
    private usuarioService: UsuarioControllerService,
    private messageService: NzMessageService,
    private fb: FormBuilder
  ){}

  formUsuario: FormGroup=this.fb.group({
  id:[],
  nivel_acc:[],
  nombre:[]

  })

  ngOnInit(): void {
      this.usuarioService.find().subscribe(data=>this.usuario=data)
  }

  eliminar(id:string):void{
    this.usuarioService.deleteById({id}).subscribe(()=>{
      this.usuario=this.usuario.filter(x => x.id !== id);
      this.messageService.success('Registro Eliminado')
    })
  }

cancel():void{
  this.messageService.info('Su registro sigue activo!')

}

ocultar():void{
  this.visible=false  
  this.formUsuario.reset()  
}

mostrar(data?:Usuario):void{
  if(data?.id){
    this.formUsuario.setValue(data)
  }
  this.visible=true
}

guardar(): void {
  if (this.formUsuario.value.id) {
    this.usuarioService.updateById({ 'id': this.formUsuario.value.id, 'body': this.formUsuario.value }).subscribe(
      () => {
        this.usuario = this.usuario.map(obj => {
          if (obj.id === this.formUsuario.value.id){
            return this.formUsuario.value;
          }
          return obj;
        })
        this.messageService.success('Registro actualizado con exito!')
        this.formUsuario.reset()
      }
    )
  } else {
    delete this.formUsuario.value.id
    this.usuarioService.create({ body: this.formUsuario.value }).subscribe((datoAgregado) => {
      this.usuario = [...this.usuario, datoAgregado]
      this.messageService.success('Registro creado con exito!')
      this.formUsuario.reset()
    })
  }
  this.visible = false
}

}