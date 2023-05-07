import { map } from 'rxjs/operators';
import { VentasService } from './../../services/ventas/ventas.service';
import { ActivatedRoute } from '@angular/router';
import { StocksService } from './../../services/stocks/stocks.service';
import { Stock } from './../../moduls/stock';
import { FarmaciasService } from './../../services/farmacias/farmacias.service';
import { Farmacia } from './../../moduls/farmacias';
import { Producto } from './../../moduls/producto';
import { ProductosService } from './../../services/productos/productos.service';
import { Component, OnInit } from '@angular/core';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {

  constructor(private ventasService: VentasService, private activated: ActivatedRoute) {
  }
  ngOnInit() {
    let id = 1;
    this.ventasService.getProductosMasVendidos(id).subscribe(
      (data: any) => {
        console.log(data);
      }
    )



  }
}

