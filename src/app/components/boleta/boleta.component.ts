import { ActivatedRoute, Router } from '@angular/router';
import { VentasService } from './../../services/ventas/ventas.service';
import { Orden } from './../../moduls/orden';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {
  orden!: Orden;
  idOrden!: number;
  idFarmacia!: number;
  texto!: any;
  constructor(private ordenService: VentasService, private activated: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idOrden = this.activated.snapshot.params['id_orden'];
    this.idFarmacia = this.activated.snapshot.params['id'];
    this.ordenService.getVenta(this.idOrden).subscribe(
      (data: Orden) => {
        this.orden = data;
      }
    )
    //this.numeroToTexto();
  }

  // numeroToTexto() {
  //   this.ordenService.convertirNumeroTexto(12).subscribe(
  //     (data: any) => {
  //       console.log(data.letras);
  //     }
  //   )
  // }
  imprimir() {
    window.print();
  }



}
