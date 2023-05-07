import { Notificacion } from './../../moduls/notificacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private http: HttpClient) { }

  getNotificaciones(idFarmacia: number) {
    return this.http.get<Notificacion[]>('http://localhost:8080/api/notificaciones/' + idFarmacia);
  }
  editNotificacion(notificacion: Notificacion) {
    return this.http.put<Notificacion>('http://localhost:8080/api/notificaciones', notificacion);
  }
}
