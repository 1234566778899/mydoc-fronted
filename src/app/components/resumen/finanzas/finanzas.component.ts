import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../../services/ventas/ventas.service';
import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})
export class FinanzasComponent implements OnInit {
  total: number = 0;
  cantidad: number = 0;
  id!: number;
  url = '';
  constructor(private ordenService: VentasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ventasHoy();
  }
  ventasHoy() {
    let inicio = new Date();
    let fin = new Date();
    fin.setDate(fin.getDate() - 1);
    this.ordenService.getIngresosYCantidad(this.id, fin, inicio).subscribe(
      (data: any) => {
        this.total = data[0];
        this.cantidad = data[1];
      }
    )
  }

}
