import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleVentaService } from './../../services/detalle-venta/detalle-venta.service';
import { Stock } from './../../moduls/stock';
import { StocksService } from './../../services/stocks/stocks.service';
import { VentasService } from './../../services/ventas/ventas.service';
import { DetalleVenta } from './../../moduls/detalleVenta';
import { Orden } from '../../moduls/orden';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FarmaciasService } from 'src/app/services/farmacias/farmacias.service';
import { Farmacia } from 'src/app/moduls/farmacias';
import { Cliente } from 'src/app/moduls/cliente';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  checked = false;
  myform!: FormGroup;
  idFarmacia!: number;
  pago!: 'efectivo' | 'tarjeta';
  venta!: Orden;
  myControl = new FormControl('');
  filteredOptions!: Observable<Stock[]>;
  stock!: Stock;
  options: Stock[] = [];
  detalles: DetalleVenta[] = [];
  farmacia!: Farmacia;
  error: boolean = false;
  existe = false;
  constructor(private formBuilder: FormBuilder, private activated: ActivatedRoute, private stockService: StocksService,
    private farmaciaService: FarmaciasService, private clienteService: ClientesService, private ordenService: VentasService,
    private detalleService: DetalleVentaService, private router: Router, private snack: MatSnackBar) {

  }
  ngOnInit() {
    this.loadMyForm();
    this.myform.get('boleta')?.setValue(this.generarCodigo());
    this.idFarmacia = this.activated.snapshot.params['id'];
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''), map(value => this._filter(value || '')),
    );
    this.getProductos();

    this.farmaciaService.getFarmacia(this.idFarmacia).subscribe(
      (data: Farmacia) => {
        this.farmacia = data;
      }
    )
  }
  getProductos() {
    this.stockService.getDisponibleParaVenta(this.idFarmacia).subscribe(
      (data: Stock[]) => {
        this.options = data;
      }
    )
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.producto.nombre.toLowerCase().includes(filterValue) ||
      option.producto.presentacion.toLowerCase().includes(filterValue));
  }

  conseguirProducto(data: any) {
    this.stock = data;
    this.myform.get('precio')?.setValue(this.stock.precioVenta);
  }
  loadMyForm() {
    this.myform = this.formBuilder.group({
      nombre: [''],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      apellido: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      pago: ['', [Validators.required]],
      boleta: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required]],
      descuento: ['0', [Validators.required, Validators.max(100), Validators.min(0)]]
    })
  }
  quitarLista(indice: number) {
    this.detalles.splice(indice, 1);
  }
  generarCodigo() {
    let num = '';
    for (let i = 0; i < 7; i++) {
      num += (Math.floor(Math.random() * 10));
    }
    return num;
  }
  addLista() {
    let _precio = this.myform.get('precio')?.value;
    let _descuento = this.myform.get('descuento')?.value;
    let _cantidad = this.myform.get('cantidad')?.value;
    let _subtotal = _cantidad * _precio;

    if (this.stock.cantidadDisponible >= _cantidad) {
      let detalle: DetalleVenta = {
        id: 0,
        producto: this.stock.producto,
        orden: this.venta,
        precioUnitario: _precio,
        descuento: (_descuento / 100) * _precio,
        subTotal: _subtotal - ((_descuento / 100) * _precio * _cantidad),
        cantidad: _cantidad,
        stockId: this.stock.id
      }
      this.detalles.push(detalle);
    } else {
      this.snack.open('Cantidad no disponible, usted tiene: ' + this.stock.cantidadDisponible, 'OK', { duration: 5000 });
    }

  }

  enviar(data: Cliente) {
    let orden: Orden = {
      id: 0,
      fecha: this.myform.get('fecha')?.value,
      formaPago: this.myform.get('pago')?.value,
      numeroBoleta: this.myform.get('boleta')?.value,
      total: this.total(),
      cliente: data,
      farmacia: this.farmacia,
      detalleVentas: []
    }
    this.ordenService.addVenta(orden).subscribe({
      next: (data: Orden) => {
        for (let i = 0; i < this.detalles.length; i++) {
          this.detalles[i].orden = data;
        }
        this.detalleService.addDetalle(this.detalles).subscribe({
          next: (res: DetalleVenta[]) => {
            this.router.navigate(['boleta/' + data.id + '/' + this.idFarmacia]);
          },
          error: e => console.log(e)
        })
      },
      error: e => console.log('error de orden: ', e)
    })
  }
  addOrden() {
    if (this.existe) {
      this.clienteService.getCliente(this.myform.get('dni')?.value).subscribe(
        (data: Cliente) => {
          this.enviar(data);
        }
      )

    } else {
      let cliente: Cliente = {
        id: 0,
        nombre: this.myform.get('nombre')?.value,
        apellido: this.myform.get('apellido')?.value,
        dni: this.myform.get('dni')?.value
      }
      this.clienteService.addCliente(cliente).subscribe({
        next: (data: Cliente) => {
          console.log('cliente', data);
          this.enviar(data);
        },
        error: (e) => console.log('error cliente: ', e)
      })
    }
  }
  total() {
    let monto = 0;
    for (let i = 0; i < this.detalles.length; i++) {
      monto += this.detalles[i].cantidad * (this.detalles[i].precioUnitario - this.detalles[i].descuento);
    }
    return monto;
  }
  findCliente() {

    let dni = this.myform.get('dni')?.value;
    this.clienteService.getClientes().subscribe(
      (data: Cliente[]) => {
        let _cliente = data.find(x => x.dni == dni);
        if (_cliente) {
          this.checked = false;
          this.myform.get('dni')?.setValue(_cliente.dni);
          this.myform.get('nombre')?.setValue(_cliente.nombre);
          this.myform.get('apellido')?.setValue(_cliente.apellido);
          this.error = false;
          this.existe = true;
        } else {
          this.error = true;
        }
      }
    )

  }

}
