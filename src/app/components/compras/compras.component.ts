import { StocksService } from './../../services/stocks/stocks.service';
import { Stock } from './../../moduls/stock';
import { FarmaciasService } from './../../services/farmacias/farmacias.service';
import { Farmacia } from './../../moduls/farmacias';
import { ProductosService } from './../../services/productos/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from './../../moduls/producto';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  myControl = new FormControl('');
  options: Producto[] = [];
  filteredOptions!: Observable<Producto[]>;
  farmacia!: Farmacia;
  producto!: Producto;
  compras: Stock[] = [];
  myform !: FormGroup;
  idFarmacia!: number;
  constructor(private formBuilder: FormBuilder, private activated: ActivatedRoute,
    private productoService: ProductosService, private stockService: StocksService,
    private router: Router, private farmaciasService: FarmaciasService) {

  }
  ngOnInit() {
    this.loadMyForm();
    this.idFarmacia = this.activated.snapshot.params['id'];
    this.farmaciasService.getFarmacia(this.idFarmacia).subscribe(
      (data: Farmacia) => {
        this.farmacia = data;
      }
    )
    this.getProductos();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );
  }

  enviarCompras() {
    this.stockService.addStock(this.compras).subscribe({
      next: (data: Stock[]) => {
        this.router.navigate(['inventario/' + this.idFarmacia]);
      }, error: e => console.log(e)
    })
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue) ||
      option.presentacion.toLowerCase().includes(filterValue));
  }

  loadMyForm() {
    this.myform = this.formBuilder.group({
      precio: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    })
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      (data: Producto[]) => {
        this.options = data;
      }
    )
  }
  addLista() {
    let _precio = this.myform.get('precio')?.value;
    let _cantidad = this.myform.get('cantidad')?.value;
    let compra: Stock = {
      id: 0,
      producto: this.producto,
      farmacia: this.farmacia,
      inversion: _precio * _cantidad,
      fechaVencimiento: this.myform.get('fecha')?.value,
      precioCompra: _precio,
      precioVenta: 0,
      cantidadDisponible: _cantidad,
      fechaCompra: this.myform.get('fecha')?.value
    }
    this.compras.push(compra);
  }
  getNombre(id: number) {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].id == id) return this.options[i].nombre + ' ,' + this.options[i].presentacion;
    }
    return 'No se encontro el producto'
  }
  conseguirProducto(data: any) {
    this.producto = data;
  }



  quitarLista(indice: number) {
    this.compras.splice(indice, 1);
  }

  getTotal() {
    let total: number = 0;
    for (let i = 0; i < this.compras.length; i++) {
      total += this.compras[i].inversion;
    }
    return total;
  }

}
