import { StocksService } from './../../services/stocks/stocks.service';
import { Stock } from './../../moduls/stock';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent implements OnInit {
  checked = false;
  idFarmacia!: number;
  stock!: Stock;
  cantidad_disponible!: number;
  fecha_vencimiento!: Date;
  precio_venta!: number;
  constructor(private activated: ActivatedRoute, private stockService: StocksService, private router: Router) { }

  ngOnInit(): void {
    this.idFarmacia = this.activated.snapshot.params['id'];
    let id_stock = this.activated.snapshot.params['id_stock'];
    this.stockService.getOneStock(id_stock).subscribe(
      (data: Stock) => {
        this.stock = data;
        this.cantidad_disponible = data.cantidadDisponible;
        this.fecha_vencimiento = data.fechaVencimiento;
        this.precio_venta = data.precioVenta;
      }
    )

  }

  guardar() {
    let stock: Stock = {
      id: this.stock.id,
      farmacia: this.stock.farmacia,
      producto: this.stock.producto,
      fechaCompra: this.stock.fechaCompra,
      cantidadDisponible: this.cantidad_disponible,
      precioVenta: this.precio_venta,
      precioCompra: this.stock.precioCompra,
      fechaVencimiento: this.fecha_vencimiento,
      inversion: this.stock.inversion
    }
    console.log('sotck update: ', stock);
    this.stockService.updateStock(stock).subscribe({
      next: (data: Stock) => {
        this.router.navigate(['inventario/' + this.idFarmacia]);
      },
      error: e => {
        console.log('error update: ', e);
      }
    })
  }
}
