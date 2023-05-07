import { Stock } from './../../moduls/stock';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  constructor(private http: HttpClient) { }

  getSock(idFarmacia: number) {
    return this.http.get<Stock[]>('http://localhost:8080/api/stock/lista/' + idFarmacia);
  }
  getOneStock(id: number) {
    return this.http.get<Stock>('http://localhost:8080/api/stock/' + id);
  }
  addStock(stock: Stock[]) {
    return this.http.post<Stock[]>('http://localhost:8080/api/stock', stock);
  }

  updateStock(stock: Stock) {
    return this.http.put<Stock>('http://localhost:8080/api/stock/update', stock);
  }
  deleteStock(id: number) {
    return this.http.delete('http://localhost:8080/api/stock/' + id);
  }

  getDisponibleParaVenta(idFarmacia: number) {
    return this.http.get<Stock[]>('http://localhost:8080/api/stock/disponible/venta/' + idFarmacia);
  }
}
