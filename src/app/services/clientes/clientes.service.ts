import { Cliente } from './../../moduls/cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes() {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }
  getCliente(dni: string) {
    return this.http.get<Cliente>('http://localhost:8080/api/clientes/' + dni);
  }
  addCliente(cliente: Cliente) {
    return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
  }

  getClientesFrecuentes(idFarmacia: number) {
    return this.http.get<any[]>('http://localhost:8080/api/clientes/frecuentes/' + idFarmacia);
  }


}
