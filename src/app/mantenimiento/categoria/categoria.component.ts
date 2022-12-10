import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/api/models';
import { CategoriaControllerService } from 'src/app/api/services';
import { NzMessageService } from 'ng-zorro-antd/message'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  categoria: Categoria[]=[];
  visible: boolean = false;

  constructor(
    private categoriaService: CategoriaControllerService,
    private messageService:NzMessageService,
    private fb:  FormBuilder

    ){}

    formCategoria: FormGroup=this.fb.group({
      id:[],
      descripcion: [],
      industria: [],
      nombre:[]

    })


ngOnInit():void{
  this.categoriaService.find().subscribe(data=>this.categoria=data)
}

mostrar(data?:Categoria):void{
  if(data?.id){
    this.formCategoria.setValue(data)
  }
  this.visible=true
}
eliminar(id:string):void{
  this.categoriaService.deleteById({id}).subscribe(()=>{
    this.categoria=this.categoria.filter(x => x.id !== id);
    this.messageService.success('Registro Eliminado')
  })

  
}
guardar():void{
    if (this.formCategoria.value.id) {
      this.categoriaService.updateById({ 'id': this.formCategoria.value.id, 'body': this.formCategoria.value }).subscribe(
        () => {
          this.categoria = this.categoria.map(obj => {
            if (obj.id === this.formCategoria.value.id){
              return this.formCategoria.value;
            }
            return obj;
          })
          this.messageService.success('Registro actualizado con exito!')
          this.formCategoria.reset()
        }
      )
    } else {
      delete this.formCategoria.value.id
      this.categoriaService.create({ body: this.formCategoria.value }).subscribe((datoAgregado) => {
        this.categoria = [...this.categoria, datoAgregado]
        this.messageService.success('Registro creado con exito!')
        this.formCategoria.reset()
      })
    }
    this.visible = false
  }


ocultar(){
  this.visible=false
  this.formCategoria.reset()
}
cancel(){
  this.messageService.info('Su registro sigue activo!')
}


}
