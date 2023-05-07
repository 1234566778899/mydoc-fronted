import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../../../moduls/producto';
import { ProductosService } from '../../../services/productos/productos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proveedor } from '../../../moduls/proveedor';
import { ProveedoresService } from '../../../services/proveedores/proveedores.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  proveedores: Proveedor[] = [];
  abrir_add_productos = false;
  abrir_add_proveedor = false;
  myForm1!: FormGroup;
  myForm2!: FormGroup;
  constructor(private productoService: ProductosService, private proveedorService: ProveedoresService,
    private formBuilder: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getProveedores();
    this.reactiveFormProducto();
    this.reactiveFormProveedor();
  }
  getProveedores() {
    this.proveedorService.getProveedores().subscribe(
      (data: Proveedor[]) => {
        this.proveedores = data;
      }
    )
  }
  reactiveFormProducto() {
    this.myForm1 = this.formBuilder.group({
      nombre_producto: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
      registro: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      recetado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      proveedor: ['', [Validators.required]]
    })
  }

  reactiveFormProveedor() {
    this.myForm2 = this.formBuilder.group({
      nombre_proveedor: ['', [Validators.required]],
      pais: ['', [Validators.required]],
      contacto: ['', [Validators.required]]
    })
  }
  close_productos() {
    this.abrir_add_productos = false;
  }

  abrir_productos() {
    this.abrir_add_productos = true;
  }
  close_proveedor() {
    this.abrir_add_proveedor = false;
  }

  abrir_proveedor() {
    this.abrir_add_proveedor = true;
  }

  addProducto() {
    console.log('yes');
    let _proveedor: Proveedor = {
      id: this.myForm1.get('proveedor')?.value,
      nombre: '',
      pais: '',
      contacto: ''
    }
    let _recetado = false;
    if (this.myForm1.get('recetado')?.value == 'true') _recetado = true;

    let producto: Producto = {
      id: 0,
      nombre: this.myForm1.get('nombre_producto')?.value,
      tipo: this.myForm1.get('nombre_producto')?.value,
      presentacion: this.myForm1.get('nombre_producto')?.value,
      esRecetado: _recetado,
      registroSanitario: this.myForm1.get('registro')?.value,
      descripcion: this.myForm1.get('descripcion')?.value,
      proveedor: _proveedor
    }
    this.productoService.addProducto(producto).subscribe({
      next: (data: Producto) => {
        this.close_productos();
        this.snack.open('El producto se agregó correctamente', 'OK', { duration: 5000 });

      },
      error: e => console.log(e)
    })
  }

  addProveedor() {
    let proveedor: Proveedor = {
      id: 0,
      nombre: this.myForm2.get('nombre_proveedor')?.value,
      pais: this.myForm2.get('pais')?.value,
      contacto: this.myForm2.get('contacto')?.value
    }

    this.proveedorService.addProveedor(proveedor).subscribe({
      next: (data: Proveedor) => {
        this.getProveedores();
        this.snack.open('El proveedor ' + data.nombre + ' se ha agregado correctamente', 'OK', { duration: 5000 });
        this.close_proveedor();
      },
      error: e => console.log(e)
    })
  }


}
