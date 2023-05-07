import { Proveedor } from './../../moduls/proveedor';
import { Producto } from 'src/app/moduls/producto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http: HttpClient) {

  }
  getProveedores() {
    return this.http.get<Proveedor[]>('http://localhost:8080/api/proveedores');
  }
  addProveedor(proveedor: Proveedor) {
    return this.http.post<Proveedor>('http://localhost:8080/api/proveedores', proveedor);
  }
}
