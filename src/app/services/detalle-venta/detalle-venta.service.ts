import { DetalleVenta } from './../../moduls/detalleVenta';
import { Orden } from '../../moduls/orden';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  constructor(private http: HttpClient) { }

  addDetalle(detalles: DetalleVenta[]) {
    return this.http.post<DetalleVenta[]>('http://localhost:8080/api/detalleVenta', detalles);
  }
}
