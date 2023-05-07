import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Correo } from 'src/app/moduls/correo';

@Injectable({
  providedIn: 'root'
})
export class CorreService {

  constructor(private http: HttpClient) { }

  sendEmail(correo: Correo) {
    return this.http.post<Correo>('http://localhost:8080/api/correo', correo);
  }
  getEmail(email: string) {
    return this.http.get<Correo>('http://localhost:8080/api/correo/' + email);
  }
}
