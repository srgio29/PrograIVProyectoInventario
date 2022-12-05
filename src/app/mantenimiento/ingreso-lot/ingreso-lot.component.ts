import { Component, OnInit } from '@angular/core';
import { IngresoLote } from 'src/app/api/models';
import { IngresoLoteControllerService } from 'src/app/api/services';

@Component({
  selector: 'app-ingreso-lot',
  templateUrl: './ingreso-lot.component.html',
  styleUrls: ['./ingreso-lot.component.css']
})
export class IngresoLotComponent implements OnInit {

  IngresoLote: IngresoLote[]=[];

  constructor(
    private ingresoLoteService: IngresoLoteControllerService
  ) {}

  ngOnInit(): void {
    this.ingresoLoteService.find().subscribe(data=>this.IngresoLote=data)
    
  }






}
