import { Farmacia } from './../../moduls/farmacias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarmaciasService {
  url = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getFarmacias() {
    return this.http.get<Farmacia[]>(`${this.url}/farmacias`);
  }
  getFarmacia(id: number) {
    return this.http.get<Farmacia>(`http://localhost:8080/api/farmacias/${id}`);
  }
  addFarmacia(farmacia: Farmacia) {
    return this.http.post<Farmacia>("http://localhost:8080/api/farmacias", farmacia);
  }
  updateFarmacia(id: number, farmacia: Farmacia) {
    return this.http.put<Farmacia>("http://localhost:8080/api/farmacias/" + id, farmacia);
  }
  updatePhoto(id: number, data: any) {
    return this.http.put<any>("http://localhost:8080/api/farmacias/photo/" + id, data);
  }
  getFarmaciaByCorreo(correo: string) {
    return this.http.get<Farmacia>('http://localhost:8080/api/farmacias/correo/' + correo);
  }
}
