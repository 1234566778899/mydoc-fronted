import { Consulta } from './../../moduls/consulta';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cons } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  addConsulta(consulta: Consulta) {
    return this.http.post<Consulta>('http://localhost:8080/api/consultas', consulta);
  }
  getConsultas() {
    return this.http.get<Consulta[]>('http://localhost:8080/api/consultas');
  }
  updateConsultas(consulta: Consulta) {
    return this.http.put<Consulta>('http://localhost:8080/api/consultas', consulta);
  }
}
