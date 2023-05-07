import { ProductosService } from '../../../services/productos/productos.service';
import { Producto } from 'src/app/moduls/producto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent implements OnInit {

  productos: Producto[] = [];
  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
      }
    )
  }

}
