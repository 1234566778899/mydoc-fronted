import { ActivatedRoute } from '@angular/router';
import { StocksService } from './../../services/stocks/stocks.service';
import { Stock } from './../../moduls/stock';
import { FarmaciasService } from './../../services/farmacias/farmacias.service';
import { Farmacia } from './../../moduls/farmacias';
import { Producto } from './../../moduls/producto';
import { ProductosService } from './../../services/productos/productos.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  displayedColumns: string[] = ['producto', 'presentacion', 'tipo', 'proveedor', 'recetado', 'cantidad', 'compra', 'venta', 'edit', 'delete'];
  dataSource!: MatTableDataSource<Stock>;
  stock: Stock[] = [];
  idFarmacia!: number;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private stockService: StocksService, private activated: ActivatedRoute) { }


  ngOnInit() {
    this.idFarmacia = this.activated.snapshot.params['id'];
    this.getStocks();
  }
  getStocks() {
    this.stockService.getSock(this.idFarmacia).subscribe(
      (data: Stock[]) => {
       
          this.dataSource = new MatTableDataSource(data);
          this.stock = data;
          this.dataSource.paginator = this.paginator;
        
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  buscarProducto(texto: string) {
    let value = texto.toUpperCase();
    let aux = this.stock.filter(x => x.producto.nombre.toUpperCase().includes(value));
    this.dataSource.data = aux;
  }
  eliminar(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No seras capáz de revertir estos cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockService.deleteStock(id).subscribe({
          next: () => {
            this.getStocks();
          }
        })
        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'El producto se ha salvado :)',
          'error'
        )
      }
    })
  }
}
